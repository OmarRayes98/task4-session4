import { Request as ExpressRequest } from "express";

import { CreateUserInput } from "../validations/user.schema";

export interface RegisterRequest extends ExpressRequest {
  body: CreateUserInput;
}
