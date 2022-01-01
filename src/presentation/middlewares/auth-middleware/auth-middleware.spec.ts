import { httpResponse } from "@/presentation/helpers";
import { HttpResponse, Middleware } from "@/presentation/protocols";

class AuthMiddleware implements Middleware {
    async handle(request: { Authorization: string }): Promise<HttpResponse> {
        const authorization = request?.Authorization;
        if (!authorization) return httpResponse.notAuthorized();
        const isValidToken = this.validateBearerTokenType(authorization);
        if (!isValidToken.isValid) return httpResponse.notAuthorized();
    }

    private validateBearerTokenType(authorization: string): { isValid: boolean } {
        const [prefix, token] = authorization.split(" ");
        if (prefix !== "Bearer") return { isValid: false };
        if (!token) return { isValid: false };
        if (authorization.split(" ").length > 2) return { isValid: false };

        return { isValid: true };
    }
}

describe("auth-middleware.spec usecase", () => {
    it("should return notAuthorized for empty authorization.", async () => {
        const sut = new AuthMiddleware();
        const middlewareResponse = await sut.handle({ Authorization: "" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });

    it("should return notAuthorized for authorization that hasnt Bearer prefix.", async () => {
        const sut = new AuthMiddleware();
        const middlewareResponse = await sut.handle({ Authorization: "any_token" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });
});
