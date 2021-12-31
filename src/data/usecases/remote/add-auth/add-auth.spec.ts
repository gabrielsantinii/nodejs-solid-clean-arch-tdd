interface AddAuthAdapter {
    add: (params: { email: string; password: string }) => Promise<{ authId: string }>;
}

class AddAuthAdapterSpy implements AddAuthAdapter {
    result: { authId: string } = { authId: "any_auth_id" };
    async add(params: { email: string; password: string }): Promise<{ authId: string }> {
        return this.result;
    }
}

interface AddAuth {
    perform: (params: { email: string; password: string }) => Promise<{ authId: string }>;
}

class RemoteAddAuth implements AddAuth {
    constructor(private readonly addAuthAdapter: AddAuthAdapter) {}

    async perform(params: { email: string; password: string }): Promise<{ authId: string }> {
        const createdAuth = await this.addAuthAdapter.add({ email: params.email, password: params.password });
        if (!createdAuth?.authId) throw new Error("Could not add auth");
        return createdAuth;
    }
}

describe("add-auth.spec usecase", () => {
    it("should return authId for valid email and password.", async () => {
        const addAuthAdapterSpy = new AddAuthAdapterSpy();
        const sut = new RemoteAddAuth(addAuthAdapterSpy);
        const createdAuth = await sut.perform({ email: "any_email@foo.com", password: "any_valid_pass" });
        expect(createdAuth).toHaveProperty("authId");
    });

    it("should throws error for response without authId from adapter.", async () => {
        const addAuthAdapterSpy = new AddAuthAdapterSpy();
        const sut = new RemoteAddAuth(addAuthAdapterSpy);
        addAuthAdapterSpy.result = undefined;
        expect(() => sut.perform({ email: "any_email@foo.com", password: "any_valid_pass" })).rejects.toThrow("Could not add auth");
    });
});
