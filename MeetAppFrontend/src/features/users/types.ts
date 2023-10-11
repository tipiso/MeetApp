export type User = {
  id: number;
  token: string;
  userName: string;
  age: number;
  photoUrl: string;
  knownAs: string;
  created: Date;
  lastActive: Date;
  gender: Gender;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
  hobbys: Hobby[];
};

export enum Gender {
  Female = 'female',
  Male = 'male',
}

export interface Photo {
  id: number;
  url: string;
  isMain: boolean;
}

export type ApiUser = {
  token: string;
  username: string;
};

export type TokenObj = {
  accessToken: string;
  username: string;
};

export type Hobby = {
  id: number;
  name: string;
};
