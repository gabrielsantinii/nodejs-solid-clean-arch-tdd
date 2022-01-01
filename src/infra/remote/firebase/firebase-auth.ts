import firebaseAdmin from "firebase-admin";
import { AddAuthAdapter, LoadAuthIdByAuthTokenAdapter } from "@/data/protocols/remote";

export class FirebaseAuth implements AddAuthAdapter, LoadAuthIdByAuthTokenAdapter {
    async add(params: AddAuthAdapter.Params): Promise<AddAuthAdapter.Result> {
        const createdAuth = await firebaseAdmin.auth().createUser({ email: params.email, password: params.password, uid: params.authId });
        return { authId: createdAuth.uid };
    }

    async loadAuthIdByToken(params: LoadAuthIdByAuthTokenAdapter.Params): Promise<LoadAuthIdByAuthTokenAdapter.Result> {
        const auth = await firebaseAdmin.auth().verifyIdToken(params.token);
        return { authId: auth.uid };
    }

    async delete(params: { authId: string }): Promise<void> {
        await firebaseAdmin.auth().deleteUser(params.authId);
    }
}
