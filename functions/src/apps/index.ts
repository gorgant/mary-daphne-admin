import * as admin from 'firebase-admin';
import { EnvironmentTypes, PRODUCTION_APPS, SANDBOX_APPS } from '../../../shared-models/environments/env-vars.model';
import { currentEnvironmentType } from '../environments/config';

// Local app intialization will automatically select sandbox or production based on which environment initialized it
export const adminApp = admin.initializeApp();

// Access to public app requires admin service account to be added to public IAM
export const getExplearningPublicApp = () => {
  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        PRODUCTION_APPS.explearningPublicApp,
        'public'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        SANDBOX_APPS.explearningPublicApp,
        'public'
      );
      break;
    default:
      app = admin.initializeApp(
        SANDBOX_APPS.explearningPublicApp,
        'public'
      );
      break;
  }
  return app;
};

// Access to Mary Daphne app requires admin service account to be added to Mary Daphne public IAM
export const getMaryDaphnePublicApp = () => {
  let app: admin.app.App;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      app = admin.initializeApp(
        PRODUCTION_APPS.maryDaphnePublicApp,
        'maryDaphnePublic'
      );
      break;
    case EnvironmentTypes.SANDBOX:
      app = admin.initializeApp(
        SANDBOX_APPS.maryDaphnePublicApp,
        'maryDaphnePublic'
      );
      break;
    default:
      app = admin.initializeApp(
        SANDBOX_APPS.maryDaphnePublicApp,
        'maryDaphnePublic'
      );
      break;
  }
  return app;
};