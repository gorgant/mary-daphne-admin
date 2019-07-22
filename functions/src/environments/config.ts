import * as functions from 'firebase-functions';
import { EnvironmentTypes, PRODUCTION_APPS, SANDBOX_APPS } from '../../../shared-models/environments/env-vars.model';
import { ProductIdList, ProductUrlSlugList, ProductReferenceList } from '../../../shared-models/products/product-id-list.model';
import { PublicAppRoutes } from '../../../shared-models/routes-and-paths/app-routes.model';

export const currentEnvironmentType = functions.config().environment.type;

const getAdminProjectId = (): string => {
  let projectId: string;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      projectId = PRODUCTION_APPS.maryDaphneAdminApp.projectId
      break;
    case EnvironmentTypes.SANDBOX:
      projectId = SANDBOX_APPS.maryDaphneAdminApp.projectId
      break;
    default:
      projectId = SANDBOX_APPS.maryDaphneAdminApp.projectId
      break;
  }
  return projectId;
}
export const adminProjectId = getAdminProjectId();

const getPublicAppUrl = (): string => {
  let appUrl: string;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      appUrl = PRODUCTION_APPS.maryDaphnePublicApp.websiteDomain;
      break;
    case EnvironmentTypes.SANDBOX:
      appUrl = SANDBOX_APPS.maryDaphnePublicApp.websiteDomain;
      break;
    default:
      appUrl = SANDBOX_APPS.maryDaphnePublicApp.websiteDomain;
      break;
  }
  return appUrl
}
export const maryDaphnePublicAppUrl = getPublicAppUrl();

const getRemoteCoachId = (): string => {
  let remoteCoachId: string;

  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      remoteCoachId = ProductIdList.MARY_DAPHNE_REMOTE_COACH
      break;
    case EnvironmentTypes.SANDBOX:
      remoteCoachId = ProductIdList.MARY_DAPHNE_SANDBOX_REMOTE_COACH;
      break;
    default:
      remoteCoachId = ProductIdList.MARY_DAPHNE_SANDBOX_REMOTE_COACH;
      break;
  }
  return remoteCoachId
}
export const remoteCoachProductId = getRemoteCoachId();

const getRemoteCoachSlug = (): string => {
  let slug: string;
  switch (currentEnvironmentType) {
    case EnvironmentTypes.PRODUCTION:
      slug = ProductUrlSlugList.REMOTE_COACH;
      break;
    case EnvironmentTypes.SANDBOX:
      slug = ProductUrlSlugList.SANDBOX_REMOTE_COACH;
      break;
    default:
      slug = ProductUrlSlugList.SANDBOX_REMOTE_COACH;
      break;
  }
  return slug;
}
export const remoteCoachProductSlug = getRemoteCoachSlug();

export const getProductUrlById = (productId: string): string => {
  const productSlug = ProductReferenceList[productId].productUrlSlug;
  const url = `https://${maryDaphnePublicAppUrl}${PublicAppRoutes.PRODUCTS}/${productId}/${productSlug}`;
  return url;
};