/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { getFirestore } from 'firebase-admin/firestore';
import { onDocumentCreated, onDocumentWritten } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';
import { getAuth } from 'firebase-admin/auth';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { I_Order } from '@freelanceafric/orders-shared';
import { initializeApp } from 'firebase-admin/app';

initializeApp();

export const newOrderCreated = onDocumentCreated(
  {
    document: `${E_FirestoreCollections.ORDERS}/{documentId}`,
    region: 'us-east1',
  },
  async (event: any) => {
    const order = event.data.data() as I_Order;
    logger.info('new order created', { structuredData: true });

    // Send a notification to the buyer that the order has been created
    getFirestore()
      .collection('mail')
      .add({
        toUids: [order.buyerUID],
        message: {
          subject: 'Your order has been created!',
          text: 'Your order has been created!',
          html: '<h1>Your order has been created!</h1> <p>Your order has been created!</p>',
        },
      })
      .then(() => console.log('Queued email for delivery!'));

    // Send a notification to the seller that the order has been created
    getFirestore()
      .collection('mail')
      .add({
        toUids: [order.sellerUID],
        message: {
          subject: 'You have a new order!',
          text: 'You have a new order!',
          html: '<h1>You have a new order!</h1> <p>You have a new order!</p>',
        },
      })
      .then(() => console.log('Queued email for delivery!'));
  },
);

export const sellerMarkOrderAsCompleted = onDocumentWritten(
  {
    document: `${E_FirestoreCollections.ORDERS}/{documentId}`,
    region: 'us-east1',
  },
  async (event: any) => {
    const orderAfter = event.data.after.data() as I_Order;
    const orderBefore = event.data.before.data() as I_Order;

    // If either of the two don't exist then it is not an update operation and we exit the function
    if (!orderBefore || !orderAfter) return;

    // If the seller order status is the same as before, then exit the function
    if (orderBefore.sellerStatus === orderAfter.sellerStatus) return;

    // If the seller order status is not completed, then exit the function
    if (orderAfter.sellerStatus !== 'COMPLETED') return;

    logger.info('seller marked order as completed', { structuredData: true });
    // Remind the seller that they have actually completed the order
    getFirestore()
      .collection('mail')
      .add({
        toUids: [orderAfter.sellerUID],
        message: {
          subject: 'You marked the order as completed!',
          text: 'You marked the order as completed!',
          html: '<h1>You marked the order as completed!</h1> <p>You marked the order as completed!</p>',
        },
      })
      .then(() => console.log('Queued email for delivery!'));

    // Send a notification to the buyer that the order has been completed
    getFirestore()
      .collection('mail')
      .add({
        toUids: [orderAfter.buyerUID],
        message: {
          subject: 'Your order has been completed!',
          text: 'Your order has been completed!',
          html: '<h1>Your order has been completed!</h1> <p>Your order has been completed!</p>',
        },
      })
      .then(() => console.log('Queued email for delivery!'));
  },
);

export const buyerMarkOrderAsCompleted = onDocumentWritten(
  {
    document: `${E_FirestoreCollections.ORDERS}/{documentId}`,
    region: 'us-east1',
  },
  async (event: any) => {
    const orderAfter = event.data.after.data() as I_Order;
    const orderBefore = event.data.before.data() as I_Order;

    // If either of the two don't exist then it is not an update operation and we exit the function
    if (!orderBefore || !orderAfter) return;

    // If the buyer order status is the same as before, then exit the function
    if (orderBefore.buyerStatus === orderAfter.buyerStatus) return;

    // If the buyer order status is not completed, then exit the function
    if (orderAfter.buyerStatus !== 'COMPLETED') return;

    logger.info('buyer marked order as completed', { structuredData: true });
    // Remind the buyer that they have actually completed the order
    getFirestore()
      .collection('mail')
      .add({
        toUids: [orderAfter.buyerUID],
        message: {
          subject: 'You marked the order as completed!',
          text: 'You marked the order as completed!',
          html: '<h1>You marked the order as completed!</h1> <p>You marked the order as completed!</p>',
        },
      })
      .then(() => console.log('Queued email for delivery!'));

    // Send a notification to the seller that the order has been completed
    getFirestore()
      .collection('mail')
      .add({
        toUids: [orderAfter.sellerUID],
        message: {
          subject: 'Your order has been completed!',
          text: 'Your order has been completed!',
          html: '<h1>Congratulations!</h1> <p>Your order has been completed!</p>',
        },
      })
      .then(() => console.log('Queued email for delivery!'));
  },
);
