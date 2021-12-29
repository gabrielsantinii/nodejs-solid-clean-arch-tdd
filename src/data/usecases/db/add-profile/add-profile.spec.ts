import { AddProfile } from "@/domain/usecases";
import { mockProfileModel } from "@/tests/domain/mocks";

const mockProfileParams = (): AddProfile.Params => ({ name: "Ronaldo", email: "", password: "", username: "", description: "" });

class AddProfileRepository {
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

describe("add-profile.spec usecase", () => {
    it("should create the profile and return the created data with id.", async () => {
        const addProfileRepository = new AddProfileRepository();
        const sut = new DbAddProfile(addProfileRepository);
        const createdProfile = await sut.perform(mockProfileParams());
        expect(createdProfile).toHaveProperty("id");
    });

    // it("Should throws an error if the created profile do not provide the id.");
});
