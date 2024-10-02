import { Injectable, inject } from '@angular/core';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { Firestore, collection, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { I_SellerCareer } from '@freelanceafric/users-shared';
import { firstValueFrom, merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerCareerService {
  auth = inject(Auth);
  firestore = inject(Firestore);

  user$ = user(this.auth);
  collection = collection(this.firestore, E_FirestoreCollections.SELLER_CAREERS);

  async createSellerCareer(career: I_SellerCareer): Promise<I_SellerCareer | false> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to create a seller career');
    const uid = loggedInUser.uid;
    career.uid = uid;
    career.createdAt = new Date().toISOString();
    career.updatedAt = new Date().toISOString();
    try {
      await setDoc(doc(this.collection, uid), career);
      await setDoc(doc(this.collection, uid, 'drafts', 'career'), career);
      return career;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateMySellerCareer(career: I_SellerCareer): Promise<I_SellerCareer | false> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to update a seller career');
    const uid = loggedInUser.uid;
    career.uid = uid;
    career.updatedAt = new Date().toISOString();
    try {
      await setDoc(doc(this.collection, uid, 'drafts', 'career'), career);
      return career;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getDraftSellerCareer(): Promise<I_SellerCareer | null> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) return null;
    const uid = loggedInUser.uid;
    const docRef = doc(this.collection, uid, 'drafts', 'career');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as I_SellerCareer;
    }
    return null;
  }

  async getDraftSellerCareerByID(uid: string): Promise<I_SellerCareer | null> {
    const docRef = doc(this.collection, uid, 'drafts', 'career');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as I_SellerCareer;
    }
    return null;
  }

  async getMySellerCareer(): Promise<{
    published: I_SellerCareer | null;
    draft: I_SellerCareer | null;
    review: I_SellerCareer | null;
  }> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to get a seller profile');
    const uid = loggedInUser.uid;
    const docRef = doc(this.collection, uid);
    const docSnap = await getDoc(docRef);
    const draft = await this.getDraftSellerCareer();
    if (draft) draft.isDraft = true;
    let published: I_SellerCareer | null = null;
    if (docSnap.exists()) {
      published = docSnap.data() as I_SellerCareer;
    }
    const reviewDocRef = doc(this.collection, uid, 'drafts', 'review');
    const reviewDocSnap = await getDoc(reviewDocRef);
    let review: I_SellerCareer | null = null;
    if (reviewDocSnap.exists()) {
      review = reviewDocSnap.data() as I_SellerCareer;
      if (review) review.isReview = true;
    }
    return { published, draft, review };
  }

  async submitForReview(): Promise<boolean> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to submit for review');
    const uid = loggedInUser.uid;
    const draft = await this.getDraftSellerCareer();
    if (!draft) throw new Error('No drafts to submit for review');
    try {
      await setDoc(doc(this.collection, uid, 'drafts', 'review'), draft);
      await setDoc(
        doc(this.collection, uid),
        {
          requestReview: true,
        },
        { merge: true },
      );
      await deleteDoc(doc(this.collection, uid, 'drafts', 'career'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async approveSellerCareer(uid: string, approvalStatus: 'approved' | 'rejected', message = ''): Promise<boolean> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to approve a seller career');
    const my_uid = loggedInUser.uid;
    const career = await this.getDraftSellerCareerByID(uid);
    if (!career) throw new Error('No career to approve');
    try {
      await setDoc(
        doc(this.collection, uid),
        {
          approval: {
            approvalStatus,
            approvedBy: my_uid,
            approvedAt: new Date().toISOString(),
            message,
          },
        },
        { merge: true },
      );
      // delete the draft
      await deleteDoc(doc(this.collection, uid, 'drafts', 'career'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
