export type Role = 'teacher' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
}

