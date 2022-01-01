import { LoadProfile } from "@/domain/usecases";
import { httpResponse } from "@/presentation/helpers";
import { HttpResponse, Middleware } from "@/presentation/protocols";

class LoadProfileSpy implements LoadProfile {
    result: LoadProfile.Result = undefined;
    async perform(params: LoadProfile.Params): Promise<LoadProfile.Result> {
        return this.result;
    }
}

class LoadProfileIdByAuthTokenSpy implements LoadProfileIdByAuthToken {
    result: LoadProfileIdByAuthToken.Result = undefined;
    async perform(params: LoadProfileIdByAuthToken.Params): Promise<LoadProfileIdByAuthToken.Result> {
        return this.result;
    }
}

interface LoadProfileIdByAuthToken {
    perform: (params: LoadProfileIdByAuthToken.Params) => Promise<LoadProfileIdByAuthToken.Result>;
}

namespace LoadProfileIdByAuthToken {
    export type Params = { authToken: string };
    export type Result = { profileId: string } | undefined;
}

class AuthMiddleware implements Middleware {
    constructor(private readonly loadProfileIdByAuthToken: LoadProfileIdByAuthToken, private readonly loadProfile: LoadProfile) {}

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

type SutType = {
    sut: AuthMiddleware;
    loadProfileIdByAuthTokenSpy: LoadProfileIdByAuthTokenSpy;
    loadProfileSpy: LoadProfileSpy;
};

export const makeSut = (): SutType => {
    const loadProfileIdByAuthTokenSpy = new LoadProfileIdByAuthTokenSpy();
    const loadProfileSpy = new LoadProfileSpy();
    const sut = new AuthMiddleware(loadProfileIdByAuthTokenSpy, loadProfileSpy);
    return { sut, loadProfileSpy, loadProfileIdByAuthTokenSpy };
};

describe("auth-middleware.spec usecase", () => {
    it("should return notAuthorized for empty authorization.", async () => {
        const { sut } = makeSut();
        const middlewareResponse = await sut.handle({ Authorization: "" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });

    it("should return notAuthorized for authorization that hasnt Bearer prefix.", async () => {
        const { sut } = makeSut();
        const middlewareResponse = await sut.handle({ Authorization: "any_token" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });

    it("should return notAuthorized for authorization that has more than 2 words (prefix and token).", async () => {
        const { sut } = makeSut();
        const middlewareResponse = await sut.handle({ Authorization: "Bearer anytoken invalidWord" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });
});
