import { Document } from 'mongoose';
export interface User {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDoc extends Document, User {
  validatePassword(password: string): Promise<boolean>;
}
