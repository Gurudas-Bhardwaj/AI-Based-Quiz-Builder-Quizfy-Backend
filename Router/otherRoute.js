import express, { Router } from 'express';
import { reportBug, reviewHandler } from '../Controller/others/OtherController.js';

export const otherRouter = express.Router();

otherRouter.post("/reportBug", reportBug);
otherRouter.post("/giveReview", reviewHandler);