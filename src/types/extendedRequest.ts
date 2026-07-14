import { Request } from "express";
import { IUser } from "../models/user.model";

export interface ExtendRequest extends Request {
  user?: IUser;
}

