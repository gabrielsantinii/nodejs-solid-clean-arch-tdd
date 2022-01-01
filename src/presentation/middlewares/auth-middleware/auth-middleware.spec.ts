import { LoadProfileIdByAuthToken } from "@/domain/usecases";
import { httpResponse } from "@/presentation/helpers";
import { throwError } from "@/tests/domain/mocks";
import { AuthMiddleware } from "@/presentation/middlewares";

class LoadProfileIdByAuthTokenSpy implements LoadProfileIdByAuthToken {
    result: LoadProfileIdByAuthToken.Result = undefined;
    async perform(params: LoadProfileIdByAuthToken.Params): Promise<LoadProfileIdByAuthToken.Result> {
        return this.result;
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
        const middlewareResponse = await sut.handle({ authorization: "" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });

    it("should return notAuthorized 401 for authorization that hasnt Bearer prefix.", async () => {
        const { sut } = makeSut();
        const middlewareResponse = await sut.handle({ authorization: "any_token" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });

    it("should return notAuthorized 401 for authorization that has more than 2 words (prefix and token).", async () => {
        const { sut } = makeSut();
        const middlewareResponse = await sut.handle({ authorization: "Bearer anytoken invalidWord" });
        expect(middlewareResponse).toEqual(httpResponse.notAuthorized());
    });

    it("should return ok 200 with profileId for valid and existing token.", async () => {
        const { sut, loadProfileIdByAuthTokenSpy } = makeSut();
        loadProfileIdByAuthTokenSpy.result = { profileId: "valid_profile_id" };
        const middlewareResponse = await sut.handle({ authorization: "Bearer any-valid-token" });
        expect(middlewareResponse).toEqual(httpResponse.ok({ profileId: "valid_profile_id" }));
    });

    it("should return server error 500 for internal throws.", async () => {
        const { sut, loadProfileIdByAuthTokenSpy } = makeSut();
        jest.spyOn(loadProfileIdByAuthTokenSpy, "perform").mockImplementationOnce(throwError);
        const middlewareResponse = await sut.handle({ authorization: "Bearer any-valid-token" });
        expect(middlewareResponse).toEqual(httpResponse.serverError(new Error()));
    });
});
