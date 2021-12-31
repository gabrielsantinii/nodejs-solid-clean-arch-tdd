import { AddAuthAdapter } from "@/data/protocols/remote";
import { AddAuth } from "@/domain/usecases";

export class RemoteAddAuth implements AddAuth {
    constructor(private readonly addAuthAdapter: AddAuthAdapter) {}

    async perform(params: { email: string; password: string }): Promise<{ authId: string }> {
        const createdAuth = await this.addAuthAdapter.add({ email: params.email, password: params.password });
        if (!createdAuth?.authId) throw new Error("Could not add auth");
        return createdAuth;
    }
}