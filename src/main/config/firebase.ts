import { initializeApp, default as firebaseAdmin } from "firebase-admin";
import { environment } from "@/main/config";

export const setupFirebase = async () => {
    initializeApp({
        credential: firebaseAdmin.credential.cert({
            clientEmail: environment.firebaseClientEmail,
            privateKey: environment.firebasePrivateKey,
            projectId: environment.firebaseProjectId,
        }),
    });
};
