import { computed, effect, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Auth, User, user } from '@angular/fire/auth';
import { I_Favorite, T_FavoriteTypes } from '@freelanceafric/users-shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService implements OnDestroy {
  auth = inject(Auth);
  firestore = inject(Firestore);

  user = signal<User | null>(null);
  user$ = user(this.auth);
  userSub = this.user$.subscribe((user) => {
    this.user.set(user);
  });

  allFavorites = signal<I_Favorite[]>([]);
  gigFavorites = computed(() => {
    return this.allFavorites().filter((favorite) => favorite.type === 'gig');
  });
  sellerFavorites = computed(() => {
    return this.allFavorites().filter((favorite) => favorite.type === 'seller');
  });

  collection = computed(() => {
    const userUID = this.user()?.uid;
    if (!userUID) return null;
    return collection(this.firestore, `${E_FirestoreCollections.USER_PROFILES}/${userUID}/favorites`);
  });

  constructor() {
    effect(async () => {
      const collection = this.collection();
      if (!collection) return;
      // listen for live updates to the favorites collection
      const favorites$ = collectionData(collection) as Observable<I_Favorite[]>;
      favorites$.subscribe((favorites) => {
        this.allFavorites.set(favorites);
      });
    });
  }

  async addToFavorites(favorite: I_Favorite): Promise<I_Favorite> {
    const collection = this.collection();
    if (!collection) throw new Error('No collection to create favorite in');
    const docRef = doc(collection);
    const newFavorite: I_Favorite = { ...favorite, id: docRef.id, createdAt: new Date().toISOString() };
    try {
      await setDoc(docRef, newFavorite);
      return newFavorite;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating favorite');
    }
  }

  async getFavorites(type?: T_FavoriteTypes): Promise<I_Favorite[]> {
    const collection = this.collection();
    if (!collection) throw new Error('No collection to get favorites from');
    let querySnapshot;
    if (type) {
      const query_ = query(collection, where('type', '==', type));
      querySnapshot = await getDocs(query_);
    } else {
      querySnapshot = await getDocs(collection);
    }
    const favorites: I_Favorite[] = [];
    querySnapshot.forEach((doc) => {
      favorites.push(doc.data() as I_Favorite);
    });
    if (type) {
      return favorites.filter((favorite) => favorite.type === type);
    }
    return favorites;
  }

  async deleteFavorite(favoriteId: string): Promise<void> {
    const collection = this.collection();
    if (!collection) throw new Error('No collection to delete favorite from');
    try {
      await deleteDoc(doc(collection, favoriteId));
    } catch (error) {
      console.log(error);
      throw new Error('Error deleting favorite');
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
