import { LoadProfileIdByAuthToken } from "@/domain/usecases";
import { httpResponse } from "@/presentation/helpers";
import { HttpResponse, Middleware } from "@/presentation/protocols";
import { throwError } from "@/tests/domain/mocks";

class LoadProfileIdByAuthTokenSpy implements LoadProfileIdByAuthToken {
    result: LoadProfileIdByAuthToken.Result = undefined;
    async perform(params: LoadProfileIdByAuthToken.Params): Promise<LoadProfileIdByAuthToken.Result> {
        return this.result;
    }
}

class AuthMiddleware implements Middleware {
    constructor(private readonly loadProfileIdByAuthToken: LoadProfileIdByAuthToken) {}

    async handle(request: { Authorization: string }): Promise<HttpResponse> {
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
    it("should return notAuthorized 401 for empty authorization.", async () => {
        const { sut } = makeSut();
        const middlewareResponse = await sut.handle({ Authorization: "" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });

    it("should return notAuthorized 401 for authorization that hasnt Bearer prefix.", async () => {
        const { sut } = makeSut();
        const middlewareResponse = await sut.handle({ Authorization: "any_token" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });

    it("should return notAuthorized 401 for authorization that has more than 2 words (prefix and token).", async () => {
        const { sut } = makeSut();
        const middlewareResponse = await sut.handle({ Authorization: "Bearer anytoken invalidWord" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });

    it("should return ok 200 with profileId for valid and existing token.", async () => {
        const { sut, loadProfileIdByAuthTokenSpy } = makeSut();
        loadProfileIdByAuthTokenSpy.result = { profileId: "valid_profile_id" };
        const middlewareResponse = await sut.handle({ Authorization: "Bearer any-valid-token" });
        expect(middlewareResponse).toEqual(httpResponse.ok({ profileId: "valid_profile_id" }));
    });

    it("should return server error 500 for internal throws.", async () => {
        const { sut, loadProfileIdByAuthTokenSpy } = makeSut();
        jest.spyOn(loadProfileIdByAuthTokenSpy, "perform").mockImplementationOnce(throwError);
        const middlewareResponse = await sut.handle({ Authorization: "Bearer any-valid-token" });
        expect(middlewareResponse).toEqual(httpResponse.serverError(new Error()));
    });
});
