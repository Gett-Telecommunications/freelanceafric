import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  Firestore,
  Query,
  Unsubscribe,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { limit, QueryFilterConstraint } from 'firebase/firestore';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GigsService {
  auth = inject(Auth);
  firestore = inject(Firestore);
  collection = collection(this.firestore, E_FirestoreCollections.GIGS);
  user$ = user(this.auth);

  private generateQuery(originalQuery: Query, queryOptions?: I_GigQueryOptions): Query {
    let statusConditions: QueryFilterConstraint[] = [];
    if (!queryOptions?.hideActive) {
      statusConditions = [where('status', '==', 'active')];
    }

    if (queryOptions?.showInactive) {
      statusConditions.push(where('status', '==', 'inactive'));
    }
    if (queryOptions?.showDeleted) {
      statusConditions.push(where('status', '==', 'deleted'));
    }
    if (queryOptions?.showDraft) {
      statusConditions.push(and(where('isDraft', '==', true), where('status', '==', 'pending')));
    }
    if (queryOptions?.showReview) {
      statusConditions.push(and(where('isReview', '==', true), where('status', '==', 'pending')));
    }

    let _query = query(originalQuery, or(...statusConditions));

    if (queryOptions?.orderBy) {
      _query = query(_query, orderBy(queryOptions.orderBy));
    }

    if (queryOptions?.orderDirection) {
      const orderField = queryOptions.orderBy || 'createdAt'; // Default to createdAt if orderBy is not specified
      _query = query(_query, orderBy(orderField, queryOptions.orderDirection));
    }

    if (queryOptions?.limit) {
      _query = query(_query, limit(queryOptions.limit));
    }

    if (queryOptions?.startAt) {
      _query = query(_query, startAfter(queryOptions.startAt));
    }

    return _query;
  }

  async createGig(gig: I_Gig): Promise<I_Gig> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to create a gig');
    const uid = loggedInUser.uid;
    const docRef = doc(this.collection);
    const newGig: I_Gig = { ...gig, id: docRef.id, sellerUID: uid };
    try {
      await setDoc(docRef, newGig);
      return newGig;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating gig');
    }
  }

  async getGigsForCategory(categoryId: string): Promise<I_Gig[]> {
    const _query = query(this.collection, where('categories', 'array-contains', categoryId));
    try {
      const querySnapshot = await getDocs(_query);
      const gigs: I_Gig[] = [];
      querySnapshot.forEach((doc) => {
        gigs.push(doc.data() as I_Gig);
      });
      return gigs;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting all gigs for ' + categoryId);
    }
  }

  async getGigsForSeller(sellerUID: string, queryOptions?: I_GigQueryOptions): Promise<I_Gig[]> {
    const _query_ = query(this.collection, where('sellerUID', '==', sellerUID));
    const _query = this.generateQuery(_query_, queryOptions);
    try {
      const querySnapshot = await getDocs(_query);
      const gigs: I_Gig[] = [];
      querySnapshot.forEach((doc) => {
        gigs.push(doc.data() as I_Gig);
      });
      return gigs;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting all gigs for ' + sellerUID);
    }
  }

  getGigsForSeller$(
    sellerUID: string,
    queryOptions?: I_GigQueryOptions,
  ): Observable<{ gigs: I_Gig[]; unsub: Unsubscribe } | null> {
    return new Observable((observer) => {
      const _query_ = query(this.collection, where('sellerUID', '==', sellerUID));
      const _query = this.generateQuery(_query_, queryOptions);
      const unsub = onSnapshot(_query, (querySnapshot) => {
        const gigs: I_Gig[] = [];
        querySnapshot.forEach((doc) => {
          gigs.push(doc.data() as I_Gig);
        });
        observer.next({ gigs, unsub });
      });
      observer.next({ gigs: [], unsub });
    });
  }

  async getGigById(gigId: string, includeDrafts = false): Promise<I_Gig | null> {
    try {
      if (includeDrafts) {
        const draftRef = doc(this.collection, gigId, 'draft', 'intro');
        const docSnap = await getDoc(draftRef);
        if (docSnap.exists()) {
          return docSnap.data() as I_Gig;
        }
      }
      const docRef = doc(this.collection, gigId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as I_Gig;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting gig by id');
    }
  }

  getGigById$(id: string, includeDrafts = false): Observable<{ gig: I_Gig | null; unsub: Unsubscribe } | null> {
    return new Observable((observer) => {
      if (includeDrafts) {
        const draftRef = doc(this.collection, id, 'draft', 'intro');
        const unsub = onSnapshot(draftRef, (doc) => {
          if (doc.exists()) {
            observer.next({ gig: doc.data() as I_Gig, unsub });
            return;
          }
        });
      }

      const docRef = doc(this.collection, id);
      const unsub = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          observer.next({ gig: doc.data() as I_Gig, unsub });
        }
      });
      observer.next({ gig: null, unsub });
      return;
    });
  }

  async getGigsByIDs(ids: string[]): Promise<I_Gig[]> {
    if (!ids.length) return [];
    try {
      const query_ = query(this.collection, where('id', 'in', ids));
      const querySnapshot = await getDocs(query_);
      const gigs: I_Gig[] = [];
      querySnapshot.forEach((doc) => {
        gigs.push(doc.data() as I_Gig);
      });
      return gigs;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting gigs by ids');
    }
  }

  async getAllGigs(option?: I_GigQueryOptions): Promise<I_Gig[]> {
    try {
      const _query_ = query(this.collection);
      const _query = this.generateQuery(_query_, option);
      const querySnapshot = await getDocs(_query);
      const gigs: I_Gig[] = [];
      querySnapshot.forEach((doc) => {
        gigs.push(doc.data() as I_Gig);
      });
      return gigs;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting all gigs');
    }
  }

  async updateGigIntro(gigId: string, gig: Partial<I_Gig>): Promise<boolean> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to update a gig');
    const my_uid = loggedInUser.uid;
    try {
      gig.id = gigId;
      const ref = doc(this.collection, gigId, 'draft', 'intro');
      await setDoc(
        ref,
        { ...gig, isDraft: true, sellerUID: my_uid, updatedAt: new Date().toISOString() },
        { merge: true },
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async requestReview(gigId: string): Promise<boolean> {
    try {
      const ref = doc(this.collection, gigId);
      await setDoc(ref, { isReview: true }, { merge: true });
      const draftRef = doc(this.collection, gigId, 'draft', 'intro');
      await setDoc(draftRef, { isReview: true }, { merge: true });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async approveGig(gigId: string, status: 'approved' | 'rejected', message = ''): Promise<boolean> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to approve a gig');
    const my_uid = loggedInUser.uid;
    const gigStatus = status === 'approved' ? 'active' : 'pending';
    try {
      // create a batch process
      const batch = writeBatch(this.firestore);

      // get the draft document
      const draftDoc = await getDoc(doc(this.collection, gigId, 'draft', 'intro'));

      // get the main document
      const mainDoc = await getDoc(doc(this.collection, gigId));

      //replace the fields in the draft in the main document
      batch.update(doc(this.collection, gigId), {
        ...mainDoc.data(),
        ...draftDoc.data(),
        isDraft: false,
        isReview: false,
        status: gigStatus,
        approval: {
          approvalStatus: 'approved',
          approvedBy: my_uid,
          approvedAt: new Date().toISOString(),
          message,
        },
      });

      // Delete the draft document
      batch.delete(doc(this.collection, gigId, 'draft', 'intro'));

      // Commit the batch
      await batch.commit();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteGig(gigId: string): Promise<boolean> {
    try {
      const ref = doc(this.collection, gigId);
      await setDoc(ref, { status: 'deleted' }, { merge: true });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

interface I_GigQueryOptions {
  limit?: number;
  startAt?: I_Gig;
  orderBy?: 'title' | 'price';
  orderDirection?: 'asc' | 'desc';
  hideActive?: boolean;
  showInactive?: boolean;
  showDeleted?: boolean;
  showDraft?: boolean;
  showReview?: boolean;
}
