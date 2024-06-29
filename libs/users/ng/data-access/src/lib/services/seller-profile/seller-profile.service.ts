import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { I_SellerProfile } from '@freelanceafric/users-shared';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerProfileService {
  auth = inject(Auth);
  firestore = inject(Firestore);

  user$ = user(this.auth);
  collection = collection(this.firestore, E_FirestoreCollections.SELLER_PROFILES);

  async createSellerProfile(profile: I_SellerProfile): Promise<I_SellerProfile | false> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to create a seller profile');
    const uid = loggedInUser.uid;
    profile.uid = uid;

    try {
      await setDoc(doc(this.collection, uid), profile);
      return profile;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getMyProfile(): Promise<I_SellerProfile | null | false> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to get a seller profile');
    const uid = loggedInUser.uid;
    try {
      const docRef = doc(this.collection, uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as I_SellerProfile;
      }
      return null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllSellerProfiles(): Promise<I_SellerProfile[]> {
    const querySnapshot = await getDocs(this.collection);
    const sellerProfiles: I_SellerProfile[] = [];
    querySnapshot.forEach((doc) => {
      sellerProfiles.push(doc.data() as I_SellerProfile);
    });
    return sellerProfiles;
  }

  getProfileByID(uid: string): Promise<I_SellerProfile | null | false> {
    const docRef = doc(this.collection, uid);
    return getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data() as I_SellerProfile;
      }
      return null;
    });
  }

  async updateMySellerProfile(profile: I_SellerProfile): Promise<I_SellerProfile | false> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in update seller profile');
    const uid = loggedInUser.uid;
    const existingProfile = await this.getProfileByID(uid);
    if (!existingProfile) throw new Error('Seller profile not found');
    profile.updatedAt = new Date().toISOString();
    const newProfile = { ...existingProfile, draft: profile, updatedAt: new Date().toISOString() };
    try {
      await setDoc(doc(this.collection, uid), newProfile);
      return profile;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async submitForReview(): Promise<boolean> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to submit for review');
    const uid = loggedInUser.uid;
    const profile = await this.getMyProfile();
    if (!profile) throw new Error('No profile to submit for review');
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

  async approveSellerProfile(
    uid: string,
    approvalStatus: 'approved' | 'rejected' | 'pending' | 'revoked',
    message = '',
  ): Promise<boolean> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to approve a seller profile');
    const my_uid = loggedInUser.uid;
    const profile = await this.getProfileByID(uid);
    if (!profile) throw new Error('No profile to approve');
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
          draft: null,
        },
        { merge: true },
      );
      // delete the draft
      await deleteDoc(doc(this.collection, uid, 'draft', 'default'));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
