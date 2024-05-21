import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { I_Category } from '@freelanceafric/categories-shared';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private firestore: Firestore = inject(Firestore);
  collection = collection(this.firestore, E_FirestoreCollections.CATEGORIES);

  async createCategory(category: I_Category): Promise<I_Category> {
    try {
      const ref = doc(this.collection);
      console.log('ref', ref);
      category.id = ref.id;
      await setDoc(ref, category);
      return category;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating category');
    }
  }

  async getCategoryById(categoryId: string): Promise<I_Category | undefined> {
    try {
      const ref = doc(this.collection, categoryId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        return docSnap.data() as I_Category;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error getting category');
    }
  }

  async getAllCategories(): Promise<I_Category[]> {
    try {
      const querySnapshot = await getDocs(this.collection);
      const categories: I_Category[] = [];
      querySnapshot.forEach((doc) => {
        categories.push(doc.data() as I_Category);
      });
      return categories;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting all categories');
    }
  }

  async updateCategory(category: I_Category): Promise<I_Category> {
    try {
      const ref = doc(this.collection, category.id);
      await setDoc(ref, category, { merge: true });
      return category;
    } catch (error) {
      console.log(error);
      throw new Error('Error updating category');
    }
  }

  async deleteCategory(category: I_Category): Promise<void> {
    try {
      const ref = doc(this.collection, category.id);
      await deleteDoc(ref);
    } catch (error) {
      console.log(error);
      throw new Error('Error deleting category');
    }
  }
}
