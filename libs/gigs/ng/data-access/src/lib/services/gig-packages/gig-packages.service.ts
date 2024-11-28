import { inject, Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { I_GigPackage } from '@freelanceafric/gigs-shared';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';

@Injectable({
  providedIn: 'root',
})
export class GigPackagesService {
  private firestore = inject(Firestore);
  private collection?: CollectionReference<DocumentData, DocumentData>;

  private _gigId?: string;

  public init(gigId: string) {
    this._gigId = gigId;
    this.collection = collection(this.firestore, `${E_FirestoreCollections.GIGS}/${gigId}/packages`);
    return this.collection;
  }

  private getCollection(gigId: string) {
    if (!this.collection) {
      const collection = this.init(gigId);
      return collection;
    }
    return this.collection;
  }

  async getAll(gigId = this._gigId): Promise<I_GigPackage[]> {
    if (!gigId) throw new Error('Gig ID not found when calling getAll on GigPackagesService');
    const collection = this.getCollection(gigId);
    const querySnapshot = await getDocs(collection);
    const packages: I_GigPackage[] = [];
    querySnapshot.forEach((doc) => {
      packages.push(doc.data() as I_GigPackage);
    });
    return packages;
  }

  async getById(id: string, gigId = this._gigId): Promise<I_GigPackage | null> {
    if (!gigId) throw new Error('Gig ID not found when calling getById on GigPackagesService');
    const collection = this.getCollection(gigId);
    const docRef = doc(collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as I_GigPackage;
    }
    return null;
  }

  async create(docPackage: I_GigPackage, gigId = this._gigId): Promise<I_GigPackage | false> {
    if (!gigId) throw new Error('Gig ID not found when calling create on GigPackagesService');
    const collection = this.getCollection(gigId);
    try {
      const docRef = await doc(collection);
      const docId = docRef.id;
      docPackage.id = docId;
      await setDoc(docRef, docPackage);
      return docPackage;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async update(docPackage: Partial<I_GigPackage>, gigId = this._gigId): Promise<I_GigPackage | false> {
    if (!gigId) throw new Error('Gig ID not found when calling update on GigPackagesService');
    const collection = this.getCollection(gigId);
    try {
      const docRef = doc(collection, docPackage.id);
      docPackage.updatedAt = new Date().toISOString();
      await setDoc(docRef, docPackage);
      const updatedDoc = await getDoc(docRef);
      return updatedDoc.data() as I_GigPackage;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async delete(id: string, gigId = this._gigId): Promise<boolean> {
    if (!gigId) throw new Error('Gig ID not found when calling delete on GigPackagesService');
    const collection = this.getCollection(gigId);
    try {
      const docRef = doc(collection, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
