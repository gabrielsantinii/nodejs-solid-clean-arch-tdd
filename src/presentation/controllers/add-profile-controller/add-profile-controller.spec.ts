import { AddProfile, CheckProfileByEmail, CheckProfileByUsername } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors";
import { badRequest, created, serverError } from "@/presentation/helpers";
import { mockProfileModel, throwError } from "@/tests/domain/mocks";
import { AddProfileController } from "@/presentation/controllers";

const mockProfileParams = (): AddProfileController.Request => ({ name: "Ronaldo", email: "", password: "", username: "", description: "" });

class CheckProfileByEmailSpy implements CheckProfileByEmail {
    result: CheckProfileByEmail.Result = false;

    async perform(params: CheckProfileByEmail.Params): Promise<CheckProfileByEmail.Result> {
        return this.result;
    }
}

class CheckProfileByUsernameSpy implements CheckProfileByUsername {
    result: CheckProfileByUsername.Result = false;

    async perform(params: CheckProfileByUsername.Params): Promise<CheckProfileByUsername.Result> {
        return this.result;
    }
}

class AddProfileSpy implements AddProfile {
    result: AddProfile.Result = mockProfileModel();

    async perform(params: AddProfile.Params): Promise<AddProfile.Result> {
        return this.result;
    }
}

type SutType = {
    sut: AddProfileController;
    checkProfileByEmailSpy: CheckProfileByEmailSpy;
    checkProfileByUsernameSpy: CheckProfileByUsernameSpy;
    addProfileSpy: AddProfileSpy;
};

const makeSut = (): SutType => {
    const checkProfileByEmailSpy = new CheckProfileByEmailSpy();
    const checkProfileByUsernameSpy = new CheckProfileByUsernameSpy();
    const addProfileSpy = new AddProfileSpy();
    const sut = new AddProfileController(checkProfileByEmailSpy, checkProfileByUsernameSpy, addProfileSpy);
    return { sut, checkProfileByEmailSpy, checkProfileByUsernameSpy, addProfileSpy };
};

describe("add-profile-controller.spec usecase", () => {
    it("should return created response (201) for successful add profile", async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(mockProfileParams());
        expect(httpResponse.statusCode).toBe(created(httpResponse.body).statusCode);
    });

    it("should return bad request error (400) for existing username.", async () => {
        const { sut, checkProfileByUsernameSpy } = makeSut();
        checkProfileByUsernameSpy.result = true;
        const httpResponse = await sut.handle(mockProfileParams());
        expect(httpResponse).toEqual(badRequest([new CustomParamError("The username already exists.")]));
    });

    it("should return bad request error (400) for existing email.", async () => {
        const { sut, checkProfileByEmailSpy } = makeSut();
        checkProfileByEmailSpy.result = true;
        const httpResponse = await sut.handle(mockProfileParams());
        expect(httpResponse).toEqual(badRequest([new CustomParamError("The email already exists.")]));
    });

    it("should return server error (500) for internal throws", async () => {
        const { sut, checkProfileByEmailSpy } = makeSut();
        jest.spyOn(checkProfileByEmailSpy, "perform").mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockProfileParams());
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
