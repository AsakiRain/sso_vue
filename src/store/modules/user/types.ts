export type RoleType = '' | '*' | 'admin' | 'user';

export interface UserState {
  id?: string;
  username?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role: RoleType;
  create_at?: string;
  update_at?: string;
  delete_at?: string;
}
