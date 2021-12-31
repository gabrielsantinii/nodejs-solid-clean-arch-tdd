import * as firebaseAdmin from "firebase-admin";
import { environment } from "@/main/config";

export const setupFirebase = async () => {
    console.log("Connecting to Firebase Admin..");
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            clientEmail: environment.firebaseClientEmail,
            privateKey: environment.firebasePrivateKey.replace(/\\n/g, "\n"),
            projectId: environment.firebaseProjectId,
        }),
    });
    console.log("Firebase Admin connected successfully.");
};
