import { GetProfileById } from "@/domain/usecases";
import { GetProfileByIdRepository } from "@/data/protocols/db";

export class DbGetProfileById implements GetProfileById {
  constructor(private readonly getProfileByIdRepository: GetProfileByIdRepository) {}

  async perform({ profileId }: GetProfileById.Params): Promise<GetProfileById.Result> {
    return this.getProfileByIdRepository.getProfileById({ profileId });
  }
}
