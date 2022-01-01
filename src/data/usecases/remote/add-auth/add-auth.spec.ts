import { AddAuthAdapter } from "@/data/protocols/remote";
import { RemoteAddAuth } from "@/data/usecases/remote";

class AddAuthAdapterSpy implements AddAuthAdapter {
    result: { authId: string } = { authId: "any_auth_id" };
    async add(params: { email: string; password: string }): Promise<{ authId: string }> {
        return this.result;
    }
}

describe("add-auth.spec usecase", () => {
    it("should return authId for valid email and password.", async () => {
        const addAuthAdapterSpy = new AddAuthAdapterSpy();
        const sut = new RemoteAddAuth(addAuthAdapterSpy);
        const createdAuth = await sut.perform({ email: "any_email@foo.com", password: "any_valid_pass", profileId: "any_prof_id" });
        expect(createdAuth).toBeUndefined();
    });

    it("should throws error for response without authId from adapter.", async () => {
        const addAuthAdapterSpy = new AddAuthAdapterSpy();
        const sut = new RemoteAddAuth(addAuthAdapterSpy);
        addAuthAdapterSpy.result = undefined;
        expect(() => sut.perform({ email: "any_email@foo.com", password: "any_valid_pass", profileId: "any_prof_id" })).rejects.toThrow(
            "Could not add auth"
        );
    });
});
