import { AddProfile, CheckProfileByEmail, CheckProfileByUsername } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors/custom-param-error";
import { badRequest, created, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { mockProfileModel, throwError } from "@/tests/domain/mocks";

const mockProfileParams = (): AddProfileController.Request => ({ name: "Ronaldo", email: "", password: "", username: "", description: "" });


class AddProfileController implements Controller {
    constructor(
        private readonly checkProfileByEmail: CheckProfileByEmail,
        private readonly checkProfileByUsername: CheckProfileByUsername,
        private readonly addProfile: AddProfile
    ) {}

    async handle(request: AddProfileController.Request): Promise<AddProfileController.Result> {
        try {
            const existsByEmail = await this.checkProfileByEmail.perform({ email: request.email });
            if (existsByEmail) {
                return badRequest([new CustomParamError("The email already exists.")]);
            }

            const existsByUsername = await this.checkProfileByUsername.perform({ username: request.username });
            if (existsByUsername) {
                return badRequest([new CustomParamError("The username already exists.")]);
            }

            const createdProfile = await this.addProfile.perform(request);
            return created(createdProfile);
        } catch (err) {
            return serverError(err as Error);
        }
    }
}

export namespace AddProfileController {
    export type Request = AddProfile.Params;
    export type Result = HttpResponse;
}

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
        expect(httpResponse.statusCode).toBe(201)
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
        jest.spyOn(checkProfileByEmailSpy, 'perform').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockProfileParams());
        expect(httpResponse).toEqual(serverError(new Error()));
    })
});
