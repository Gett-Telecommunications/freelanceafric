import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { getAuth } from 'firebase-admin/auth';
import * as logger from 'firebase-functions/logger';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';

// when a document is marked for defaultRippleAnimationConfig, rin the tasks to clear out all data about it
export const deleteGigAndRelatedDocuments = onDocumentWritten(
  { document: `${E_FirestoreCollections.GIGS}/{documentId}`, region: 'us-east1' },
  async (event: any) => {
    const userID = event.params.documentId;
    const data = event.data.after.data();
    const user = await getAuth().getUser(userID);

    // Log a message to the console
    logger.log('Delete gig:', { userID, data, user });
  },
);
