import { AuthMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/protocols";
import { makeRemoteLoadProfileIdByAuthToken } from "../usecases";

export const makeAuthMiddleware = (): Middleware => {
    const middleware = new AuthMiddleware(makeRemoteLoadProfileIdByAuthToken());
    return middleware;
};
