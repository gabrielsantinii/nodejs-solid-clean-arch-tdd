export type ProfileModel = {
    id: string;
    name: string;
    email: string;
    username: string;
    backgroundUrl: string;
    avatarUrl: string;
    description: string;
    createdAt: Date;
};

export type ProfileModelWithLikes = ProfileModel & { likesCount: number };
