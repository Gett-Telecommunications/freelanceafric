import { inject, Injectable } from '@angular/core';
import {
  and,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  or,
  Query,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { I_Payment } from '@freelanceafric/payments-shared';
import { I_Order } from '@freelanceafric/orders-shared';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private firestore = inject(Firestore);
  collection = collection(this.firestore, E_FirestoreCollections.ORDERS);

  // Creates a payment record in the DB
  async newOrder(order: I_Order) {
    const docRef = doc(this.collection, order.id);
    await setDoc(docRef, order);
    return order;
  }

  async getOrderById(orderId: string): Promise<I_Order | null> {
    const docRef = doc(this.collection, orderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as I_Order;
    }
    return null;
  }

  async getOrdersByUserUID(userUID: string, role: 'buyer' | 'seller'): Promise<I_Order[]> {
    let _query;
    switch (role) {
      case 'buyer':
        _query = query(this.collection, and(where('buyerUID', '==', userUID), where('sellerUID', '!=', 'null')));
        break;
      case 'seller':
        _query = query(this.collection, and(where('sellerUID', '==', userUID), where('buyerUID', '!=', 'null')));
        break;
    }
    const docSnap = await getDocs(_query);
    const orders: I_Order[] = [];
    docSnap.forEach((doc) => {
      orders.push(doc.data() as I_Order);
    });
    return orders;
  }
}