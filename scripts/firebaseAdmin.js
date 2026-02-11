import {
  apps,
  app,
  initializeApp,
  credential as _credential,
} from "firebase-admin";

const initAdmin = () => {
  if (apps.length) {
    return app();
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson);
    initializeApp({
      credential: _credential.cert(serviceAccount),
    });
    return app();
  }

  initializeApp();
  return app();
};

export default { admin, initAdmin };
