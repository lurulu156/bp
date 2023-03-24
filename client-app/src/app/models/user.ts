export interface User {
  username: string;
  displayName: string;
  department: string;
  title: string;
  token: string;
  image?: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName?: string;
  department?: string;
  title?: string;
  username?: string;
}