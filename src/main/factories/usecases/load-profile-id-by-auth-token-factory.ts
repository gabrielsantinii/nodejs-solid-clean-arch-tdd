import { RemoteLoadProfileIdByAuthToken } from "@/data/usecases/remote";
import { FirebaseAuth } from "@/infra/remote";

export const makeRemoteLoadProfileIdByAuthToken = (): RemoteLoadProfileIdByAuthToken => {
    const firebaseAuth = new FirebaseAuth();
    const remoteLoadProfileIdByAuthToken = new RemoteLoadProfileIdByAuthToken(firebaseAuth);
    return remoteLoadProfileIdByAuthToken;
};
