import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';
import * as functions from 'firebase-functions';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { E_FirestoreCollections, defaultCustomClaims } from '@freelanceafric/shared-shared';

initializeApp();

export const createUserPermissionsDocumentOnRegistration = functions.auth.user().onCreate(async (user) => {
  // Log a message to the console
  logger.log('User created with UID:', user.uid);
  // Create a new document in the database with the user's UID as the ID
  await getFirestore()
    .collection(E_FirestoreCollections.USER_PERMISSIONS)
    .doc(user.uid)
    .set({
      ...defaultCustomClaims,
      uid: user.uid,
      email: user.email,
      isAdmin: false,
      isSeller: false,
    });
});

export const createUserPermissionsDocumentOnLoginIfNotExists = functions.auth.user().beforeSignIn(async (user) => {
  // Log a message to the console
  logger.log('User created with UID:', user.uid);
  // Check if the user already exists in the database
  const userDoc = await getFirestore().collection(E_FirestoreCollections.USER_PERMISSIONS).doc(user.uid).get();
  if (userDoc.exists) {
    return;
  }
  // Create a new document in the database with the user's UID as the ID
  await getFirestore()
    .collection(E_FirestoreCollections.USER_PERMISSIONS)
    .doc(user.uid)
    .set({
      ...defaultCustomClaims,
      uid: user.uid,
      email: user.email,
    });
});
