import { NextFunction, Request, Response } from 'express';
import User from '../model/userModal';

export const getAllBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: 'success',
      length: users.length,
      data: users,
    });
  } catch (error) {}
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
};
