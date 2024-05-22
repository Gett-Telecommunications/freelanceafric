import { Injectable, inject } from '@angular/core';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
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
      await setDoc(
        doc(this.collection, uid),
        {
          status: 'pending',
        },
        { merge: true },
      );
      await setDoc(doc(this.collection, uid, 'draft', 'default'), career);
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
    const docRef = doc(this.collection, uid, 'draft', 'default');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as I_SellerCareer;
    }
    return null;
  }

  async getMySellerCareer(): Promise<I_SellerCareer | null> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) return null;
    const uid = loggedInUser.uid;
    const docRef = doc(this.collection, uid);
    const docSnap = await getDoc(docRef);
    const draft = await this.getDraftSellerCareer();
    if (docSnap.exists()) {
      const career = docSnap.data() as I_SellerCareer;
      career.draft = draft;
      return career;
    }
    return null;
  }

  async submitForReview(): Promise<boolean> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to submit for review');
    const uid = loggedInUser.uid;
    const career = await this.getMySellerCareer();
    if (!career) throw new Error('No career to submit for review');
    try {
      await setDoc(
        doc(this.collection, uid),
        {
          requestReview: true,
        },
        { merge: true },
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
