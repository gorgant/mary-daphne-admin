import { maryDaphneAdminApp, maryDaphnePublicApp, altEnvironmentMaryDaphneAdminApp } from "./app-config";

export const adminFirestore = maryDaphneAdminApp.firestore();
export const publicFirestore = maryDaphnePublicApp.firestore();
export const altEnvAdminFirestore = altEnvironmentMaryDaphneAdminApp.firestore();
export const altEnvPublicFirestore = altEnvironmentMaryDaphneAdminApp.firestore();
