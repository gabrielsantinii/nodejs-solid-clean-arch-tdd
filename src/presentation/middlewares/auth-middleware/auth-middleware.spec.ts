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
    constructor(private readonly loadProfileIdByAuthToken: LoadProfileIdByAuthToken) {}

    async handle(request: { Authorization: string }): Promise<HttpResponse> {
        const authorization = request?.Authorization;
        if (!authorization) return httpResponse.notAuthorized();
        const isValidToken = this.validateBearerTokenType(authorization);
        if (!isValidToken.isValid) return httpResponse.notAuthorized();
        const profileByToken = await this.loadProfileIdByAuthToken.perform({ authToken: isValidToken.token });
        if (!profileByToken) return httpResponse.notAuthorized();

        return httpResponse.ok({ profileId: profileByToken.profileId });
    }

    private validateBearerTokenType(authorization: string): { isValid: boolean; token: string } {
        const invalidResponse = { isValid: false, token: undefined };
        const [prefix, token] = authorization.split(" ");
        if (prefix !== "Bearer") return invalidResponse;
        if (!token) return invalidResponse;
        if (authorization.split(" ").length > 2) return invalidResponse;

        return { isValid: true, token };
    }
}

type SutType = {
    sut: AuthMiddleware;
    loadProfileIdByAuthTokenSpy: LoadProfileIdByAuthTokenSpy;
};

export const makeSut = (): SutType => {
    const loadProfileIdByAuthTokenSpy = new LoadProfileIdByAuthTokenSpy();
    const sut = new AuthMiddleware(loadProfileIdByAuthTokenSpy);
    return { sut, loadProfileIdByAuthTokenSpy };
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
