import { AddProfileRepository } from "@/data/protocols/db";
import { AddProfile } from "@/domain/usecases";
import { mockProfileModel } from "@/tests/domain/mocks";
import { DbAddProfile } from "./add-profile";

const mockProfileParams = (): AddProfile.Params => ({ name: "Ronaldo", email: "", password: "", username: "", description: "" });

class AddProfileRepositorySpy implements AddProfileRepository {
    result: AddProfile.Result = mockProfileModel();
    async add(params: AddProfile.Params): Promise<AddProfile.Result> {
        return this.result;
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
        addProfileRepositorySpy.result = { ...addProfileRepositorySpy.result, id: "" };

        expect(async () => await sut.perform(mockProfileParams())).rejects.toThrow("Could not save the profile on database.");
    });
});
