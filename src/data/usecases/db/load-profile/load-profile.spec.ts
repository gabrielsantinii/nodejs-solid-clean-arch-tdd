import { ProfileMongoRepository } from "@/infra/db";
import { LoadProfileRepository } from "@/data/protocols/db";
import { DbLoadProfile } from "./load-profile";

type SutType = {
    loadProfileRepository: LoadProfileRepository;
    sut: DbLoadProfile;
};

const makeSut = (): SutType => {
    const loadProfileRepository = new ProfileMongoRepository();
    const sut = new DbLoadProfile(loadProfileRepository);
    return { sut, loadProfileRepository };
};

describe("get-profile-by-id usecase", () => {
    it("should return an existing profile", async () => {
        const { sut } = makeSut();
        const profileData = await sut.perform({ profileId: "existant_id" });
        expect(profileData?.id).toBeTruthy();
    });

    it("should return undefined for not existing profile", async () => {
        const { sut } = makeSut();
        const profileData = await sut.perform({ profileId: "any_profile_id" });
        expect(profileData?.id).toBeUndefined();
    });
});
