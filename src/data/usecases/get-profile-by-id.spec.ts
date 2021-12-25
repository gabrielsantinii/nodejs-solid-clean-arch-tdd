interface GetProfileById {
  perform: (params: GetProfileById.Params) => Promise<GetProfileById.Model>;
}

export namespace GetProfileById {
  export type Params = {
    profileId: string;
  };

  export type Model =
    | {
        id: string;
      }
    | undefined;
}

class GetProfileByIdRepository {
  async perform(profileId: string): Promise<{ id: string } | undefined> {
    if (profileId === "existant_id") return { id: profileId };
    
    return undefined;
  }
}

class DbGetProfileById implements GetProfileById {
  constructor(private readonly getProfileByIdRepository: GetProfileByIdRepository) {}

  async perform({ profileId }: { profileId: string }) {
    const profileData = await this.getProfileByIdRepository.perform(profileId);

    return profileData;
  }
}

type SutType = {
  getProfileByIdRepository: GetProfileByIdRepository;
  sut: DbGetProfileById;
};

const makeSut = (): SutType => {
  const getProfileByIdRepository = new GetProfileByIdRepository();
  const sut = new DbGetProfileById(getProfileByIdRepository);
  return { sut, getProfileByIdRepository };
};

describe("get-profile-by-id usecase", () => {
  it("should return an existing profile", async () => {
    const { sut } = makeSut();
    const profileData = await sut.perform({ profileId: "existant_id" });
    expect(profileData?.id).toBe("existant_id");
  });

  it("should return undefined for not existing profile", async () => {
    const { sut } = makeSut();
    const profileData = await sut.perform({ profileId: "any_profile_id" });
    expect(profileData?.id).toBeUndefined();
  });
});
