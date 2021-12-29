import { CountProfileLikesRepository } from "@/data/protocols/db";
import { CountProfileLikes } from "@/domain/usecases";
import { DbCountProfileLikes } from "@/data/usecases/db";

class CountProfileLikesRepositorySpy implements CountProfileLikesRepository {
    result: CountProfileLikesRepository.Result = 10
     async countByProfileId (params: CountProfileLikes.Params): Promise<CountProfileLikesRepository.Result> {
        return this.result
     }
}

type SutType = {
    sut: CountProfileLikes;
    countProfileLikesRepositorySpy: CountProfileLikesRepositorySpy;
};

const makeSut = (): SutType => {
    const countProfileLikesRepositorySpy = new CountProfileLikesRepositorySpy();
    const sut = new DbCountProfileLikes(countProfileLikesRepositorySpy);
    return { sut, countProfileLikesRepositorySpy };
};

describe("get-like-count-by-profile-id.spec usecase", () => {
    it("should return a numeric count", async () => {
        const { sut } = makeSut();
        const likesCounts = await sut.perform({ profileId: "any_profile_id" });
        expect(typeof likesCounts).toBe("number");
    });
});
