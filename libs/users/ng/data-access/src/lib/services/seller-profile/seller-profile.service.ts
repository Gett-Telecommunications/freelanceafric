import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
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
      await setDoc(doc(this.collection, uid, 'drafts', 'profile'), profile);
      return profile;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getMyProfile(): Promise<
    { draft: I_SellerProfile | null; published: I_SellerProfile | null; review: I_SellerProfile | null } | false
  > {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to get their own seller profile');
    const uid = loggedInUser.uid;
    try {
      const draft = await this.getMyDraftSellerProfile();
      if (draft) draft.isDraft = true;
      const docRef = doc(this.collection, uid);
      const docSnap = await getDoc(docRef);
      let published: I_SellerProfile | null = null;
      if (docSnap.exists()) {
        published = docSnap.data() as I_SellerProfile;
      }
      const reviewDocRef = doc(this.collection, uid, 'drafts', 'review');
      const reviewDocSnap = await getDoc(reviewDocRef);
      let review: I_SellerProfile | null = null;
      if (reviewDocSnap.exists()) {
        review = reviewDocSnap.data() as I_SellerProfile;
        if (review) review.isReview = true;
      }
      return { published, draft: draft || null, review };
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllSellerProfiles(includeUnpublished = false): Promise<I_SellerProfile[]> {
    let query_;
    if (includeUnpublished) {
      query_ = query(this.collection);
    } else {
      query_ = query(this.collection, where('status', '==', 'active'));
    }
    const querySnapshot = await getDocs(query_);
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

  async getProfileByIDs(ids: string[]): Promise<I_SellerProfile[]> {
    if (!ids.length) return [];
    try {
      const query_ = query(this.collection, where('uid', 'in', ids));
      const querySnapshot = await getDocs(query_);
      const sellers: I_SellerProfile[] = [];
      querySnapshot.forEach((doc) => {
        sellers.push(doc.data() as I_SellerProfile);
      });
      return sellers;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting sellers by ids');
    }
  }

  async getMyDraftSellerProfile(): Promise<I_SellerProfile | null | false> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to get their own draft seller profile');
    const uid = loggedInUser.uid;
    try {
      const docRef = doc(this.collection, uid, 'drafts', 'profile');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as I_SellerProfile;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting seller profile');
    }
  }

  async getDraftSellerProfileByID(uid: string): Promise<I_SellerProfile | null | false> {
    try {
      const docRef = doc(this.collection, uid, 'drafts', 'profile');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as I_SellerProfile;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting seller profile');
    }
  }

  async updateMySellerProfile(newProfile: I_SellerProfile): Promise<I_SellerProfile | false> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in update seller profile');
    const uid = loggedInUser.uid;
    try {
      await setDoc(doc(this.collection, uid, 'drafts', 'profile'), newProfile);
      return newProfile;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async submitForReview(): Promise<boolean> {
    const loggedInUser = await firstValueFrom(this.user$);
    if (!loggedInUser) throw new Error('User must be logged in to submit for review on seller profile');
    const uid = loggedInUser.uid;
    const draft = await this.getMyDraftSellerProfile();
    if (!draft) throw new Error('No draft to submit for review');
    try {
      await setDoc(doc(this.collection, uid, 'drafts', 'review'), draft);
      await setDoc(doc(this.collection, uid), { requestReview: true }, { merge: true });
      await deleteDoc(doc(this.collection, uid, 'drafts', 'profile'));
      return true;
    } catch (error: any) {
      console.log('Error submitting seller profile for review', error.message);
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
