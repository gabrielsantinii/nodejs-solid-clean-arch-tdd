import { LoadProfileIdByAuthToken } from "@/domain/usecases";
import { httpResponse } from "@/presentation/helpers";
import { HttpResponse, Middleware } from "@/presentation/protocols";

export class AuthMiddleware implements Middleware {
    constructor(private readonly loadProfileIdByAuthToken: LoadProfileIdByAuthToken) {}

    async handle(request: AuthMiddleware.Request): Promise<AuthMiddleware.Result> {
        try {
            const authorization = request?.Authorization;
            if (!authorization) return httpResponse.notAuthorized();
            const isValidToken = this.validateBearerTokenFormat(authorization);
            if (!isValidToken.isValid) return httpResponse.notAuthorized();
            const profileByToken = await this.loadProfileIdByAuthToken.perform({ authToken: isValidToken.token });
            if (!profileByToken) return httpResponse.notAuthorized();

            return httpResponse.ok({ profileId: profileByToken.profileId });
        } catch (err) {
            return httpResponse.serverError(err as Error);
        }
    }

    private validateBearerTokenFormat(authorization: string): { isValid: boolean; token: string } {
        const invalidResponse = { isValid: false, token: undefined };
        const [prefix, token] = authorization.split(" ");
        if (prefix !== "Bearer") return invalidResponse;
        if (!token) return invalidResponse;
        if (authorization.split(" ").length > 2) return invalidResponse;

        return { isValid: true, token };
    }
}
export namespace AuthMiddleware {
    export type Request = { Authorization: string }
    export type Result = HttpResponse
}