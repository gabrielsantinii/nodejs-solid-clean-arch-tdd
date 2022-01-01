import { RemoteAddAuth } from "@/data/usecases/remote";
import { AddAuth } from "@/domain/usecases";
import { FirebaseAuth } from "@/infra/remote";

export const makeAddAuth = (): AddAuth => {
    const addAuthAdapter = new FirebaseAuth();
    const remoteAddAuth = new RemoteAddAuth(addAuthAdapter);
    return remoteAddAuth;
};
