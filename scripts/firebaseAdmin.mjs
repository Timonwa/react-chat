import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";

export const initAdmin = () => {
  if (getApps().length) {
    return getApp();
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountJson) {
    return initializeApp({
      credential: cert(JSON.parse(serviceAccountJson)),
    });
  }

  return initializeApp();
};
