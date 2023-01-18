export interface UserState {
  uid?: number;
  username?: string;
  nickname?: string;
  role?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface UserInfo {
  uid: number;
  username: string;
  nickname: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
