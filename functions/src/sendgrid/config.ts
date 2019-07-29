import * as functions from 'firebase-functions';
import { adminFirestore } from '../db';
import * as sendGridMail from '@sendgrid/mail';
import { publicAppUrl, remoteCoachProductId, remoteCoachProductSlug } from '../environments/config';
import { PublicAppRoutes } from '../../../shared-models/routes-and-paths/app-routes.model';

// Iniitialize Cloud Firestore Database
export const db = adminFirestore;
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// ENV Variables
export const sendgridSecret: string = functions.config().sendgrid.secret;

// Initialize SG and export
export const getSgMail = () => {
  const sendgrid = sendGridMail;
  sendGridMail.setApiKey(sendgridSecret);
  return sendgrid;
}


// Useful links for emails
const appUrl = publicAppUrl;
const blogSlugWithSlashPrefix = PublicAppRoutes.BLOG;
const blogUrl = `https://${appUrl}${blogSlugWithSlashPrefix}`;
const productListSlugWithSlashPrefix = PublicAppRoutes.PRODUCTS;
const remoteCoachUrl = `https://${appUrl}${productListSlugWithSlashPrefix}/${remoteCoachProductId}/${remoteCoachProductSlug}`;

export const EmailWebsiteLinks = {
  BLOG_URL: blogUrl,
  REMOTE_COACH_URL: remoteCoachUrl
};