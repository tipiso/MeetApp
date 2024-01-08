import { UserLikesFilterPredicate } from 'types/pagination';

type SearchFriendsDTO = {
  searchString: string;
  minAge: string;
  maxAge: string;
  gender: string;
  hobbies: string[];
};

type UpdateUserDTO = {
  age: number;
  introduction: string;
  knownAs: string;
  hobbies: string[];
};

type LikedUsersDTO = {
  userId: number;
  predicate: UserLikesFilterPredicate;
};

export type { SearchFriendsDTO, UpdateUserDTO, LikedUsersDTO };
