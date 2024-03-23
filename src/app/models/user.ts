export type User = {
  wallet: string;
  profile: Profile;
  telegram: Telegram;
  twitter: Twitter;
  royalty: number
};

type Profile = {
  name: string;
  username: string;
  bio: string;
  image: string;
  descriptor: string;
  noun: string;
  seniority: string;
};

type Telegram = {
  id: number;
  firstName: string;
  username: string;
  points: number;
};

type Twitter = {
  id: string;
  name: string;
  username: string;
  providerId: string;
};
