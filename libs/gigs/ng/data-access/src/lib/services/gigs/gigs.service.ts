import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { I_Gig } from '@freelanceafric/gigs-shared';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GigsService {
  auth = inject(Auth);
  firestore = inject(Firestore);
  collection = collection(this.firestore, E_FirestoreCollections.GIGS);
  user$ = user(this.auth);

  async createGig(gig: I_Gig): Promise<I_Gig> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to create a gig');
    const uid = loggedInUser.uid;
    const docRef = doc(this.collection);
    const newGig: I_Gig = { ...gig, id: docRef.id, sellerUid: uid };
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

  async getGigsForSeller(sellerUid: string): Promise<I_Gig[]> {
    const _query = query(this.collection, where('sellerUid', '==', sellerUid));
    try {
      const querySnapshot = await getDocs(_query);
      const gigs: I_Gig[] = [];
      querySnapshot.forEach((doc) => {
        gigs.push(doc.data() as I_Gig);
      });
      return gigs;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting all gigs for ' + sellerUid);
    }
  }

  async getGigById(gigId: string): Promise<I_Gig | null> {
    try {
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
}
