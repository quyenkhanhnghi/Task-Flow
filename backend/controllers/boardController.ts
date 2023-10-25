import { Request, Response, NextFunction } from 'express';
import boardModel from '../model/boardModel';
import s3 from '../config/aws.config';
import multer from 'multer';
import path from 'path';
import { PutObjectCommand } from '@aws-sdk/client-s3';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const upLoadFile = upload.single('image');

export const getAllBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: late find by user id -

    const boards = await boardModel.find({});
    res.status(200).json({
      status: 'success',
      length: boards.length,
      data: boards,
    });
  } catch (error) {}
};

export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newBoard = await boardModel.create({});
};

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME || 'tasktrekker',
      Key: `${Date.now()}-${path.basename(req.file.originalname)}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
  } catch (error) {
    console.log(error);
  }
};
