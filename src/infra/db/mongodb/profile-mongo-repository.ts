import { GetProfileByIdRepository } from "@/data/protocols/db";
import { mockProfileModel } from "@/tests/domain/mocks/mock-profile";

export class ProfileMongoRepository implements GetProfileByIdRepository {
  async getProfileById({ profileId }: GetProfileByIdRepository.Params): Promise<GetProfileByIdRepository.Result> {
    if (profileId === "existant_id") return { ...mockProfileModel() };

    return undefined;
  }
}
