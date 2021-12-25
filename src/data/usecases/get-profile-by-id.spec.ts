interface GetProfileById {
  perform: (params: GetProfileById.Params) => Promise<GetProfileById.Model>;
}

export namespace GetProfileById {
  export type Params = {
    profileId: string;
  };

  export type Model = {
    id: string;
  };
}

class DbGetProfileById {
  perform({ profileId }: { profileId: string }): { id: string } | undefined {
    if (profileId !== "existant_id") return undefined;

    return {
      id: profileId,
    };
  }
}

describe("get-profile-by-id usecase", () => {
  it("should return an existing profile", async () => {
    const sut = new DbGetProfileById();
    const profileData = sut.perform({ profileId: "existant_id" });
    expect(profileData?.id).toBe("existant_id");
  });

  it("should return undefined for not existing profile", async () => {
    const sut = new DbGetProfileById();
    const profileData = sut.perform({ profileId: "any_profile_id" });
    expect(profileData?.id).toBeUndefined();
  });
});
