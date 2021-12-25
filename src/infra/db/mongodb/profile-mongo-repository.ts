import { GetProfileByIdRepository } from "@/data/protocols/db";

export class ProfileMongoRepository implements GetProfileByIdRepository {
  async getProfileById({ profileId }: GetProfileByIdRepository.Params): Promise<GetProfileByIdRepository.Result> {
    if (profileId === "existant_id") return { id: profileId };

    return undefined;
  }
}
