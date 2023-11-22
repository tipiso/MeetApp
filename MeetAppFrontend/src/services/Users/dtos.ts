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

export type { SearchFriendsDTO, UpdateUserDTO };
