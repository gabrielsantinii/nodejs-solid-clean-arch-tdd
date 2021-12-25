import { GetLikeCountByPostIdRepository } from "@/data/protocols/db";
import { GetLikeCountByPostId } from "@/domain/usecases";
import { LikeMongoRepository } from "@/infra/db";
import { DbGetLikeCountByPostId } from "./get-like-count-by-post-id";

type SutType = {
  sut: GetLikeCountByPostId;
  getLikeCountByPostIdRepository: GetLikeCountByPostIdRepository;
};

const makeSut = (): SutType => {
  const getLikeCountByPostIdRepository = new LikeMongoRepository();
  const sut = new DbGetLikeCountByPostId(getLikeCountByPostIdRepository);
  return { sut, getLikeCountByPostIdRepository };
};

describe("get-like-count-by-post-id usecase", () => {
  it("should return the count of likes in some post based on postId", async () => {
    const { sut } = makeSut()
    const likeCount = await sut.perform({ postId: "any_post_id" });
    expect(typeof likeCount).toBe("number");
  });
});
