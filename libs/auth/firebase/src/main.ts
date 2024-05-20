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

export const setCustomClaimsOnUserOnUpdateToUserPermissionsDocument = onDocumentWritten(
  { document: `${E_FirestoreCollections.USER_PERMISSIONS}/{documentId}`, region: 'us-east1' },
  async (event: any) => {
    const userID = event.params.documentId;
    const data = event.data.after.data();
    const user = await getAuth().getUser(userID);

    const _defaultClaims = {
      ...defaultCustomClaims,
      uid: userID,
      email: user.email,
    };
    // Log a message to the console
    logger.log('User updated with UID:', userID);
    // Set the custom claims on the user
    getAuth().setCustomUserClaims(userID, { ..._defaultClaims, ...data, uid: userID });
  },
);
