import express, { Router } from 'express';
import { reportBug } from '../Controller/others/OtherController.js';

export const otherRouter = express.Router();

otherRouter.post("/reportBug", reportBug);