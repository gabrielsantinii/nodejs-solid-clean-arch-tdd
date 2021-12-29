import {
    AddProfileRepository,
    CheckProfileByEmailRepository,
    CheckProfileByUsernameRepository,
    LoadProfileRepository,
} from "@/data/protocols/db";

export class ProfileMongoRepository
    implements LoadProfileRepository, AddProfileRepository, CheckProfileByUsernameRepository, CheckProfileByEmailRepository
{
    async loadProfile({ profileId }: LoadProfileRepository.Params): Promise<LoadProfileRepository.Result> {
        return undefined;
    }

    async add(params: AddProfileRepository.Params): Promise<AddProfileRepository.Result> {
        return {
            id: 'asghsadd-agisdkljada-asdasd',
            name: params.name,
            avatarUrl: "",
            backgroundUrl: "",
            createdAt: new Date(),
            description: params.description || "",
            email: params.email,
            username: params.username,
        };
    }

    async checkByUsername(params: CheckProfileByUsernameRepository.Params): Promise<CheckProfileByUsernameRepository.Result> {
        return undefined;
    }

    async checkByEmail(params: CheckProfileByEmailRepository.Params): Promise<CheckProfileByEmailRepository.Result> {
        return undefined;
    }
}
