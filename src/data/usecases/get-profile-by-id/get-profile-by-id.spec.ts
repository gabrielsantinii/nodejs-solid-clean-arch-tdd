import { ProfileMongoRepository } from "@/infra/db";
import { GetProfileByIdRepository } from "../protocols/db";
import { DbGetProfileById } from "./get-profile-by-id";

type SutType = {
  getProfileByIdRepository: GetProfileByIdRepository;
  sut: DbGetProfileById;
};

const makeSut = (): SutType => {
  const getProfileByIdRepository = new ProfileMongoRepository();
  const sut = new DbGetProfileById(getProfileByIdRepository);
  return { sut, getProfileByIdRepository };
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
