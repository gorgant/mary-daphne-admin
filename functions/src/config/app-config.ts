import * as admin from 'firebase-admin';
import { EnvironmentTypes, PRODUCTION_APPS, SANDBOX_APPS } from '../../../shared-models/environments/env-vars.model';
import { currentEnvironmentType } from './environments-config';
import * as functions from 'firebase-functions';


// Access to public app requires admin service account to be added to public IAM
const getMdlsAdminApp = () => {
  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        PRODUCTION_APPS.mdlsAdminApp,
        'mdlsAdminApp'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        SANDBOX_APPS.mdlsAdminApp,
        'mdlsAdminApp'
      );
      break;
    default:
      throw new functions.https.HttpsError('failed-precondition', `No environment type detected when creating admin app`);
  }
  return app;
};
export const mdlsAdminApp = getMdlsAdminApp();

// Access to public app requires admin service account to be added to public IAM
const getMdlsPublicApp = () => {
  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        PRODUCTION_APPS.mdlsPublicApp,
        'mdlsPublicApp'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        SANDBOX_APPS.mdlsPublicApp,
        'mdlsPublicApp'
      );
      break;
    default:
      throw new functions.https.HttpsError('failed-precondition', `No environment type detected when creating public app`);
  }
  return app;
};
export const mdlsPublicApp = getMdlsPublicApp();

const getAltEnvironmentMdlsAdminApp = () => {

  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        SANDBOX_APPS.mdlsAdminApp,
        'altMdlsAdminApp'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        PRODUCTION_APPS.mdlsAdminApp,
        'altMdlsAdminApp'
      );
      break;
    default:
      throw new functions.https.HttpsError('failed-precondition', `No environment type detected when creating alt admin app`);
  }
  return app;
}

export const altEnvironmentMdlsAdminApp = getAltEnvironmentMdlsAdminApp();

const getAltEnvironmentMdlsPublicApp = () => {

  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        SANDBOX_APPS.mdlsPublicApp,
        'altMdlsPublicApp'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        PRODUCTION_APPS.mdlsPublicApp,
        'altMdlsPublicApp'
      );
      break;
    default:
      throw new functions.https.HttpsError('failed-precondition', `No environment type detected when creating alt public app`);
  }
  return app;
}

export const altEnvironmentMdlsPublicApp = getAltEnvironmentMdlsPublicApp();
