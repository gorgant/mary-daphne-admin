import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { AdminUser } from '../../../shared-models/user/admin-user.model';
import { AdminCollectionPaths } from '../../../shared-models/routes-and-paths/fb-collection-paths';
import { adminFirestore } from '../config/db-config';
import { now } from 'moment';

const addUserToDb = async (authUser: admin.auth.UserRecord) => {
  
  const publicUser: AdminUser = {
    displayName: authUser.displayName as string,
    email: authUser.email as string,
    avatarUrl: authUser.photoURL,
    id: authUser.uid, 
    isAdmin: false, // For now, set this manually via the console for security reasons (could use an approved email list)
    lastAuthenticated: now(),
    createdDate: now()
  }

  await adminFirestore.collection(AdminCollectionPaths.ADMIN_USERS).doc(authUser.uid).set(publicUser)
    .catch(err => {functions.logger.log(`Failed to create admin user in admin database:`, err); throw new functions.https.HttpsError('internal', err);});
  functions.logger.log('Admin user created', publicUser);
}

/////// DEPLOYABLE FUNCTIONS ///////

export const createAdminUser = functions.auth.user().onCreate( async (user) => {
    
  return addUserToDb(user);
});

