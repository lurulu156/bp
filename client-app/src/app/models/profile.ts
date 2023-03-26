import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  department: string;
  title: string;
  photos?: Photo[];
  followersCount: number;
  followingCount: number;
  following: boolean;
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
    this.department = user.department;
    this.title = user.title;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export interface UserScenario {
  id: string;
  title: string;
  category: string;
  dueDate: Date;
}