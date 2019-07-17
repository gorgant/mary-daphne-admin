import { adminApp, getExplearningPublicApp, getMaryDaphnePublicApp } from "../apps";
import { Storage } from '@google-cloud/storage';

// LOCAL VARIABLES
export const adminFirestore = adminApp.firestore();
export const adminStorage = new Storage();


// PUBLIC VARIABLES
export const explearningPublicFirestore = getExplearningPublicApp().firestore();
export const maryDaphnePublicFirestore = getMaryDaphnePublicApp().firestore();
