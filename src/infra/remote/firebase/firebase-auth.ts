import firebaseAdmin from "firebase-admin";
import { AddAuthAdapter } from "@/data/protocols/remote";

export class FirebaseAuth implements AddAuthAdapter {
    async add(params: AddAuthAdapter.Params): Promise<AddAuthAdapter.Result> {
        const createdAuth = await firebaseAdmin.auth().createUser({ email: params.email, password: params.password });
        return { authId: createdAuth.uid };
    }
}
