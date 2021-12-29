import { CheckProfileByUsernameRepository } from "@/data/protocols/db";
import { DbCheckProfileByUsername } from "@/data/usecases/db";
import { CheckProfileByUsername } from "@/domain/usecases";
import { mockProfileModel } from "@/tests/domain/mocks";

class CheckProfileByUsernameRepositorySpy implements CheckProfileByUsernameRepository {
    result: CheckProfileByUsernameRepository.Result = mockProfileModel();
    async checkByUsername(params: CheckProfileByUsernameRepository.Params): Promise<CheckProfileByUsernameRepository.Result> {
        return this.result;
    }
}

type SutType = {
    sut: CheckProfileByUsername;
    checkProfileByUsernameRepositorySpy: CheckProfileByUsernameRepositorySpy;
};

const makeSut = (): SutType => {
    const checkProfileByUsernameRepositorySpy = new CheckProfileByUsernameRepositorySpy();
    const sut = new DbCheckProfileByUsername(checkProfileByUsernameRepositorySpy);

    return { sut, checkProfileByUsernameRepositorySpy };
};

describe("check-profile-by-username.spec usecase", () => {
    it("should return true cause exists.", async () => {
        const { sut } = makeSut();
        const profileExists = await sut.perform({ username: "" });
        expect(profileExists).toBeTruthy();
    });

    it("should return false cause doesnt exists.", async () => {
        const { sut, checkProfileByUsernameRepositorySpy } = makeSut();
        checkProfileByUsernameRepositorySpy.result = undefined;
        const profileExists = await sut.perform({ username: "" });
        expect(profileExists).toBeFalsy();
    });
});
