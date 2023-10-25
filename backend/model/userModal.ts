import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { UserDoc } from '../types/user.interface';

const UserSchema = new Schema<UserDoc>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: [validator.isEmail, 'invalid email'],
      createIndex: { unique: true },
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    await bcryptjs.hash(this.password, 12);
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

UserSchema.methods.validatePassword = async function (password: string) {
  return await bcryptjs.compare(password, this.password);
};

export default model<UserDoc>('User', UserSchema);
