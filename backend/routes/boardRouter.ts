import { getAllBoard } from "../controllers/boardControler";
import express from "express";

const boardRouter = express.Router();

boardRouter.get("/", getAllBoard);

export { boardRouter };
