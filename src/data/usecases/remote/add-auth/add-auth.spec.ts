class RemoteAddAuth {
    async perform(params: { email: string; password: string }): Promise<{ authId: string }> {
        const createdAuth = { authId: "any-auth-id" };
        return createdAuth;
    }
}

describe("add-auth.spec usecase", () => {
    it("should return authId for valid email and password.", async () => {
        const sut = new RemoteAddAuth();
        const createdAuth = await sut.perform({ email: "any_email@foo.com", password: "any_valid_pass" });
        expect(createdAuth).toHaveProperty("authId");
    });
});
