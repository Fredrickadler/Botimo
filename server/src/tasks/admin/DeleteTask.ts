import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { BAD_REQUEST, OK } from "http-status-codes";
import FormatedError from "../../utils/FormatedError";
import TaskModel from "../tasks.model";
import FormatedResponse from "../../utils/FormatedResponse";

const DeleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const session = await mongoose.startSession();
    try {
        const deleting = await TaskModel.findByIdAndDelete(req?.body?._id, { session });
        res.send(FormatedResponse(OK, 'task deleted!', deleting));
    } catch (error) {
        if (error instanceof Error) {
            res.status(BAD_REQUEST).send(FormatedError(BAD_REQUEST, error.message));
        } else {
            next(error);
        }
    } finally {
        session.endSession();
    }
};

export default DeleteTask;