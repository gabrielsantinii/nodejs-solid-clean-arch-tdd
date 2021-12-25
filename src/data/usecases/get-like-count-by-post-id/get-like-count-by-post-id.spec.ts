import { DbGetLikeCountByPostId } from "./get-like-count-by-post-id";

class GetLikeCountByPostIdRepository {
  async countLikeByPostId({ postId }: { postId: string }) {
    return 10;
  }
}

describe("get-like-count-by-post-id usecase", () => {
  it("should return the count of likes in some post based on postId", async () => {
    const getLikeCountByPostIdRepository = new GetLikeCountByPostIdRepository();
    const sut = new DbGetLikeCountByPostId(getLikeCountByPostIdRepository);
    const likeCount = sut.perform({ postId: "any_post_id" });
    expect(typeof likeCount).toBe("number");
  });
});
