export type User = {
  id: number;
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