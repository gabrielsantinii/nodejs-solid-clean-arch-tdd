import { ProfileModel } from "@/domain/models";
import { mockProfileModel } from "@/tests/domain/mocks";

export interface CheckProfileByUsername {
    perform: (params: CheckProfileByUsername.Params) => Promise<CheckProfileByUsername.Result>;
}

export namespace CheckProfileByUsername {
    export type Params = { username: string };
    export type Result = boolean;
}

export interface CheckProfileByUsernameRepository {
    checkByUsername: (params: CheckProfileByUsernameRepository.Params) => Promise<CheckProfileByUsernameRepository.Result>;
}

export namespace CheckProfileByUsernameRepository {
    export type Params = CheckProfileByUsername.Params;
    export type Result = ProfileModel | undefined;
}

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

class DbCheckProfileByUsername implements CheckProfileByUsername {
    constructor(private readonly checkProfileByUsernameRepository: CheckProfileByUsernameRepository) {}

    async perform(params: CheckProfileByUsername.Params): Promise<CheckProfileByUsername.Result> {
        const profile = await this.checkProfileByUsernameRepository.checkByUsername({ username: params.username });
        return !!profile;
    }
}

describe("check-profile-by-username.spec usecase", () => {
    it("should return true if exists.", async () => {
        const { sut } = makeSut();
        const profileExists = await sut.perform({ username: "" });
        expect(profileExists).toBeTruthy();
    });
});
