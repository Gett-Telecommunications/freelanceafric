import { Injectable, inject } from '@angular/core';
import { E_FirestoreCollections, I_CustomClaims } from '@freelanceafric/shared-shared';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firestore = inject(Firestore);
  collection = collection(this.firestore, E_FirestoreCollections.USER_PERMISSIONS);

  async updateUserPermission(uid: string, permissions: Partial<I_CustomClaims>): Promise<boolean> {
    try {
      setDoc(doc(this.collection, uid), permissions, { merge: true });
      return true;
    } catch (error) {
      console.log(error);
      throw new Error('Error updating user permissions');
    }
  }
}
