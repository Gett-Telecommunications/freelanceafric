import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { I_Payment } from '@freelanceafric/payments-shared';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private firestore = inject(Firestore);
  collection = collection(this.firestore, E_FirestoreCollections.PAYMENTS);

  // Creates a payment record in the DB
  async bypassPayment(payment: I_Payment) {
    const docRef = doc(this.collection);
    const generatedId = docRef.id;
    payment.id = generatedId;
    payment.reference = generatedId;
    await setDoc(docRef, payment);
    return payment;
  }
}
