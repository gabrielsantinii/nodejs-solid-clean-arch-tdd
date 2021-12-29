import { CheckProfileByEmailRepository } from "@/data/protocols/db";
import { DbCheckProfileByEmail } from "@/data/usecases/db";
import { CheckProfileByEmail } from "@/domain/usecases";
import { mockProfileModel } from "@/tests/domain/mocks";

class CheckProfileByEmailRepositorySpy implements CheckProfileByEmailRepository {
    result: CheckProfileByEmailRepository.Result = mockProfileModel();
    async checkByEmail(params: CheckProfileByEmailRepository.Params): Promise<CheckProfileByEmailRepository.Result> {
        return this.result;
    }
}

type SutType = {
    sut: CheckProfileByEmail;
    checkProfileByEmailRepositorySpy: CheckProfileByEmailRepositorySpy;
};

const makeSut = (): SutType => {
    const checkProfileByEmailRepositorySpy = new CheckProfileByEmailRepositorySpy();
    const sut = new DbCheckProfileByEmail(checkProfileByEmailRepositorySpy);

    return { sut, checkProfileByEmailRepositorySpy };
};

describe("check-profile-by-email.spec usecase", () => {
    it("should return true cause exists.", async () => {
        const { sut } = makeSut();
        const profileExists = await sut.perform({ email: "" });
        expect(profileExists).toBeTruthy();
    });

    it("should return false cause doesnt exists.", async () => {
        const { sut, checkProfileByEmailRepositorySpy } = makeSut();
        checkProfileByEmailRepositorySpy.result = undefined;
        const profileExists = await sut.perform({ email: "" });
        expect(profileExists).toBeFalsy();
    });
});
