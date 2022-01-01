import { AddAuth, AddProfile, CheckProfileByEmail, CheckProfileByUsername } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
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

class AddAuthSpy implements AddAuth {
    result: AddAuth.Result = undefined;
    async perform(params: AddAuth.Params): Promise<AddAuth.Result> {
        return this.result;
    }
}

type SutType = {
    sut: AddProfileController;
    checkProfileByEmailSpy: CheckProfileByEmailSpy;
    checkProfileByUsernameSpy: CheckProfileByUsernameSpy;
    addProfileSpy: AddProfileSpy;
    addAuthSpy: AddAuthSpy;
};

const makeSut = (): SutType => {
    const checkProfileByEmailSpy = new CheckProfileByEmailSpy();
    const checkProfileByUsernameSpy = new CheckProfileByUsernameSpy();
    const addProfileSpy = new AddProfileSpy();
    const addAuthSpy = new AddAuthSpy();
    const sut = new AddProfileController(checkProfileByEmailSpy, checkProfileByUsernameSpy, addProfileSpy, addAuthSpy);
    return { sut, checkProfileByEmailSpy, checkProfileByUsernameSpy, addProfileSpy, addAuthSpy };
};

describe("add-profile-controller.spec usecase", () => {
    it("should return created response (201) for successful add profile", async () => {
        const { sut } = makeSut();
        const controllerResponse = await sut.handle(mockProfileParams());
        expect(controllerResponse.statusCode).toBe(httpResponse.created(controllerResponse.body).statusCode);
    });

    it("should return bad request error (400) for existing username.", async () => {
        const { sut, checkProfileByUsernameSpy } = makeSut();
        checkProfileByUsernameSpy.result = true;
        const controllerResponse = await sut.handle(mockProfileParams());
        expect(controllerResponse).toEqual(httpResponse.badRequest([new CustomParamError("The username already exists.")]));
    });

    it("should return bad request error (400) for existing email.", async () => {
        const { sut, checkProfileByEmailSpy } = makeSut();
        checkProfileByEmailSpy.result = true;
        const controllerResponse = await sut.handle(mockProfileParams());
        expect(controllerResponse).toEqual(httpResponse.badRequest([new CustomParamError("The email already exists.")]));
    });

    it("should return server error (500) for internal throws", async () => {
        const { sut, checkProfileByEmailSpy } = makeSut();
        jest.spyOn(checkProfileByEmailSpy, "perform").mockImplementationOnce(throwError);
        const controllerResponse = await sut.handle(mockProfileParams());
        expect(controllerResponse).toEqual(httpResponse.serverError(new Error()));
    });
});
