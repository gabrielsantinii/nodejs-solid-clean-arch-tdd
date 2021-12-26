import { LoadRecentPosts } from "@/domain/usecases";

export interface LoadRecentPostsRepository {
   loadRecentPosts: (params: LoadRecentPostsRepository.Params) => Promise<LoadRecentPostsRepository.Result>;
}

export namespace LoadRecentPostsRepository {
   export type Params = LoadRecentPosts.Params;
   export type Result = LoadRecentPosts.Result;
}