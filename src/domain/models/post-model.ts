export type PostModel = {
    id: string;
    postedBy: {
        id: string;
        name: string;
        username: string;
    };
    postedAt: Date;
    contentDescription: string;
};

export type PostModelWithLikes = PostModel & { likesCount: number };
