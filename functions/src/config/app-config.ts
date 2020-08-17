import * as admin from 'firebase-admin';
import { EnvironmentTypes, PRODUCTION_APPS, SANDBOX_APPS } from '../../../shared-models/environments/env-vars.model';
import { currentEnvironmentType } from './environments-config';
import * as functions from 'firebase-functions';


// Access to public app requires admin service account to be added to public IAM
const getMaryDaphneAdminApp = () => {
  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        PRODUCTION_APPS.maryDaphneAdminApp,
        'maryDaphneAdminApp'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        SANDBOX_APPS.maryDaphneAdminApp,
        'maryDaphneAdminApp'
      );
      break;
    default:
      throw new functions.https.HttpsError('failed-precondition', `No environment type detected when creating admin app`);
  }
  return app;
};
export const maryDaphneAdminApp = getMaryDaphneAdminApp();

// Access to public app requires admin service account to be added to public IAM
const getMaryDaphnePublicApp = () => {
  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        PRODUCTION_APPS.maryDaphnePublicApp,
        'maryDaphnePublicApp'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        SANDBOX_APPS.maryDaphnePublicApp,
        'maryDaphnePublicApp'
      );
      break;
    default:
      throw new functions.https.HttpsError('failed-precondition', `No environment type detected when creating public app`);
  }
  return app;
};
export const maryDaphnePublicApp = getMaryDaphnePublicApp();

const getAltEnvironmentMaryDaphneAdminApp = () => {

  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        SANDBOX_APPS.maryDaphneAdminApp,
        'altMaryDaphneAdminApp'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        PRODUCTION_APPS.maryDaphneAdminApp,
        'altMaryDaphneAdminApp'
      );
      break;
    default:
      throw new functions.https.HttpsError('failed-precondition', `No environment type detected when creating alt admin app`);
  }
  return app;
}

export const altEnvironmentMaryDaphneAdminApp = getAltEnvironmentMaryDaphneAdminApp();

const getAltEnvironmentMaryDaphnePublicApp = () => {

  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        SANDBOX_APPS.maryDaphnePublicApp,
        'altMaryDaphnePublicApp'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        PRODUCTION_APPS.maryDaphnePublicApp,
        'altMaryDaphnePublicApp'
      );
      break;
    default:
      throw new functions.https.HttpsError('failed-precondition', `No environment type detected when creating alt public app`);
  }
  return app;
}

export const altEnvironmentMaryDaphnePublicApp = getAltEnvironmentMaryDaphnePublicApp();
