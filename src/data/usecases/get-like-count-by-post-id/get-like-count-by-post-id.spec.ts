class GetLikeCountByPostIdRepository {
  countLikeByPostId({ postId }: { postId: string }) {
    return 10;
  }
}

class GetLikeCountByPostId {
  constructor(private readonly getLikeCountByPostIdRepository: GetLikeCountByPostIdRepository) {}
  perform({ postId }: { postId: string }) {
    return this.getLikeCountByPostIdRepository.countLikeByPostId({ postId });
  }
}

describe("get-like-count-by-post-id usecase", () => {
  it("should return the count of likes in some post based on postId", async () => {
    const getLikeCountByPostIdRepository = new GetLikeCountByPostIdRepository();
    const sut = new GetLikeCountByPostId(getLikeCountByPostIdRepository);
    const likeCount = sut.perform({ postId: "any_post_id" });
    expect(typeof likeCount).toBe("number");
  });
});
