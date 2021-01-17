import { mdlsAdminApp, mdlsPublicApp, altEnvironmentMdlsAdminApp } from "./app-config";

export const adminFirestore = mdlsAdminApp.firestore();
export const publicFirestore = mdlsPublicApp.firestore();
export const altEnvAdminFirestore = altEnvironmentMdlsAdminApp.firestore();
export const altEnvPublicFirestore = altEnvironmentMdlsAdminApp.firestore();
