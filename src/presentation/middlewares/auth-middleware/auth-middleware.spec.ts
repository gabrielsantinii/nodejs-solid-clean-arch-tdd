import { httpResponse } from "@/presentation/helpers";
import { HttpResponse, Middleware } from "@/presentation/protocols";

class AuthMiddleware implements Middleware {
    async handle(request: { Authorization: string }): Promise<HttpResponse> {
        const authorization = request?.Authorization
        if (!authorization) return httpResponse.notAuthorized();
    }
}

describe("auth-middleware.spec usecase", () => {
    it("should return ok with profile data.", async () => {
        const sut = new AuthMiddleware();
        const middlewareResponse = await sut.handle({ Authorization: "" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized())
    });
});
