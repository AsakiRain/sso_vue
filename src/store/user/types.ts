export type RoleType = '' | '*' | 'admin' | 'user';

export interface UserState {
  uid?: string;
  username?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role?: RoleType;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
