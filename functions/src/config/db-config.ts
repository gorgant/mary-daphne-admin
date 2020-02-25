import { maryDaphneAdminApp, maryDaphnePublicApp } from "./app-config";

export const adminFirestore = maryDaphneAdminApp.firestore();
export const publicFirestore = maryDaphnePublicApp.firestore();
