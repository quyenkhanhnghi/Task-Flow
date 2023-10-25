import express from 'express';
import { getAllBoard } from '../controllers/boardController';

const boardRouter = express.Router();

boardRouter.get('/', getAllBoard);

export { boardRouter };
