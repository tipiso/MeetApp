type PaginationDTO = { pageNumber: number; pageSize: number };

type UserLikesFilterPredicate = 'liked' | 'likedBy' | 'friends' | 'invites';

export type { PaginationDTO, UserLikesFilterPredicate };
