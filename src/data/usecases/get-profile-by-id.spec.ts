class GetProfileById {
  perform({ profileId }: { profileId: string }) {
    return {
      id: profileId,
    };
  }
}

describe("get-profile-by-id usecase", () => {
  it("should return an existing profile", async () => {
    const sut = new GetProfileById();
    const profileData = sut.perform({ profileId: "any_profile_id" });
    expect(profileData.id).toBe("any_profile_id");
  });
});
