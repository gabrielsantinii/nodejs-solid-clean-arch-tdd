import { AddProfile } from "@/domain/usecases";
import { mockProfileModel } from "@/tests/domain/mocks";

const mockProfileParams = (): AddProfile.Params => ({ name: "Ronaldo", email: "", password: "", username: "", description: "" });

export interface AddProfileRepository {
    add: (params: AddProfileRepository.Params) => Promise<AddProfileRepository.Result>;
}

export namespace AddProfileRepository {
    export type Params = AddProfile.Params;
    export type Result = AddProfile.Result;
}

class AddProfileRepositorySpy {
    result: AddProfile.Result = mockProfileModel();
    async add(params: AddProfile.Params): Promise<AddProfile.Result> {
        return this.result;
    }
}

class DbAddProfile implements AddProfile {
    constructor(private readonly addProfileRepository: AddProfileRepository) {}

    async perform(params: AddProfile.Params): Promise<AddProfile.Result> {
        return this.addProfileRepository.add(params);
    }
}

type SutType = {
    addProfileRepositorySpy: AddProfileRepositorySpy;
    sut: DbAddProfile;
};

const makeSut = (): SutType => {
    const addProfileRepositorySpy = new AddProfileRepositorySpy();
    const sut = new DbAddProfile(addProfileRepositorySpy);

    return { addProfileRepositorySpy, sut };
};

describe("add-profile.spec usecase", () => {
    it("should create the profile and return the created data with id.", async () => {
        const { sut } = makeSut();
        const createdProfile = await sut.perform(mockProfileParams());
        expect(createdProfile).toHaveProperty("id");
    });

    it("Should throws an error if the created profile do not provide the id.", async () => {
        const { sut, addProfileRepositorySpy } = makeSut();

        const createdProfile = await sut.perform(mockProfileParams());
        expect(createdProfile).toHaveProperty("id");
    });
});
