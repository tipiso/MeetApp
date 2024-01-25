type PaginationDTO = { pageNumber: number; pageSize: number };

type UserLikesFilterPredicate = 'liked' | 'likedBy' | 'friends';

export type { PaginationDTO, UserLikesFilterPredicate };
