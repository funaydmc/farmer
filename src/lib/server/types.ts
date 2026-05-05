export interface User {
  _id?: string;
  username: string;
  password_hash: string;
  max_concurrent_profiles: number;
  created_at: Date;
  updated_at: Date;
}

export interface JwtPayload {
  sub: string;
  username: string;
  exp?: number;
}
