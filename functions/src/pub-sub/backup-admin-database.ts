import * as functions from 'firebase-functions';
import { auth } from 'google-auth-library';
import { AdminTopicNames } from '../../../shared-models/routes-and-paths/fb-function-names';
import { adminProjectId, currentEnvironmentType } from '../config/environments-config';
import { EnvironmentTypes, ProductionCloudStorage, SandboxCloudStorage } from '../../../shared-models/environments/env-vars.model';
import { Bucket } from '@google-cloud/storage';
import { now } from 'moment';
import { maryDaphneAdminStorage } from '../config/storage-config';

const adminStorage = maryDaphneAdminStorage;

let backupBucket: Bucket;

const setBucketsBasedOnEnvironment = (): Bucket => {

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      backupBucket = adminStorage.bucket(ProductionCloudStorage.MARY_DAPHNE_ADMIN_BACKUP_STORAGE_AF_CF);
      break;
    case EnvironmentTypes.SANDBOX:
      backupBucket = adminStorage.bucket(SandboxCloudStorage.MARY_DAPHNE_ADMIN_BACKUP_STORAGE_AF_CF);
      break;
    default:
      backupBucket = adminStorage.bucket(SandboxCloudStorage.MARY_DAPHNE_ADMIN_BACKUP_STORAGE_AF_CF);
      break;
  }

  return backupBucket;
}

// Courtesy of: https://medium.com/@nedavniat/how-to-perform-and-schedule-firestore-backups-with-google-cloud-platform-and-nodejs-be44bbcd64ae

const processBackup = async () => {
  const projectId = adminProjectId;
  const bucket = setBucketsBasedOnEnvironment();
  // Check for api updates: https://firebase.google.com/docs/firestore/reference/rest/v1beta1/projects.databases/exportDocuments
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectId}/databases/(default):exportDocuments`;
  functions.logger.log(`Deploying backup data to this bucket: ${bucket.name} and this url ${url}`);

  // Must add import/export IAM to default service account
  const admin = await auth.getClient({
    scopes: [                               // scopes required to make a request
        'https://www.googleapis.com/auth/datastore',
    ]
  })
    .catch(err => {functions.logger.log(`Error getting auth client:`, err); throw new functions.https.HttpsError('internal', err);});;

  return admin.request({
    url,
    method: 'POST',
    data: {
      outputUriPrefix: `gs://${bucket.name}/database-backup/${now()}`
    }
  })
    .catch(err => {functions.logger.log(`Error submitting backup POST request:`, err); throw new functions.https.HttpsError('internal', err);});;
}

/////// DEPLOYABLE FUNCTIONS ///////

// Listen for pubsub message
export const backupAdminDatabase = functions.pubsub.topic(AdminTopicNames.BACKUP_ADMIN_DATABASE_TOPIC).onPublish( (message, context) => {
  return processBackup();
});