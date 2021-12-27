import { LoadProfileRepository } from "@/data/protocols/db";
import { DbLoadProfile } from "@/data/usecases/db";
import { mockProfileModel } from "@/tests/domain/mocks";

class LoadProfileRepositorySpy implements LoadProfileRepository {
    result: LoadProfileRepository.Result = mockProfileModel();
    async loadProfile(params: LoadProfileRepository.Params): Promise<LoadProfileRepository.Result> {
        return this.result;
    }
}

type SutType = {
    loadProfileRepositorySpy: LoadProfileRepositorySpy;
    sut: DbLoadProfile;
};

const makeSut = (): SutType => {
    const loadProfileRepositorySpy = new LoadProfileRepositorySpy();

    const sut = new DbLoadProfile(loadProfileRepositorySpy);
    return { sut, loadProfileRepositorySpy };
};

describe("get-profile-by-id usecase", () => {
    it("should return an existing profile", async () => {
        const { sut } = makeSut();
        const profileData = await sut.perform({ profileId: "existant_id" });
        expect(profileData?.id).toBeTruthy();
    });

    it("should return undefined for not existing profile", async () => {
        const { sut, loadProfileRepositorySpy } = makeSut();
        loadProfileRepositorySpy.result = undefined;
        const profileData = await sut.perform({ profileId: "any_profile_id" });
        expect(profileData?.id).toBeUndefined();
    });
});
