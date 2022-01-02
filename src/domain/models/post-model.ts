export type PostModel = {
    id: string;
    postedBy: {
        id: string;
        name: string;
        username: string;
        avatarUrl: string;
    };
    postedAt: Date;
    contentDescription: string;
};

export type PostModelWithLikes = PostModel & { likesCount: number };
