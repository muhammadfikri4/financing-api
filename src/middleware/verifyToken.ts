import { NextFunction, type Request, type Response } from "express";
import { TokenDecodeInterface } from "../interface";
import {
  TokenExpiredError,
  decode,
  verify,
  JsonWebTokenError,
} from "jsonwebtoken";
import { RequestWithAccessToken } from "../interface/Request";
import { config } from "../libs";
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { HandleResponse } from "../utils/HandleResponse";
import { MESSAGES } from "../utils/Messages";
import { Role } from "@prisma/client";
import { userRepo } from "../repository";

export const VerifyToken =
  (roles: Role[] = ["ADMIN"]) =>
  async (req: Request, res: Response, next: NextFunction) => {

    const token = req?.headers?.authorization?.replace("Bearer ", "");
    
    if (!token) {
      return HandleResponse(
        res,
        401,
        MESSAGE_CODE.UNAUTHORIZED,
        MESSAGES.ERROR.UNAUTHORIZED.FORBIDDEN
      );
    }
    const decoded = decode(token) as TokenDecodeInterface;
    console.log({
      token
    })
    verify(token, config.JWT_SECRET as string, (err: unknown) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          console.log("tes exp");

          return HandleResponse(
            res,
            401,
            MESSAGE_CODE.UNAUTHORIZED,
            MESSAGES.ERROR.UNAUTHORIZED.EXPIRED
          );
        }
        if (err instanceof JsonWebTokenError) {
          return HandleResponse(
            res,
            401,
            MESSAGE_CODE.UNAUTHORIZED,
            err.message
          );
        }
        return HandleResponse(
          res,
          401,
          MESSAGE_CODE.UNAUTHORIZED,
          MESSAGES.ERROR.INVALID.TOKEN
        );
      }
    });
    if (!decoded?.userId) {
      return HandleResponse(
        res,
        401,
        MESSAGE_CODE.UNAUTHORIZED,
        MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED
      );
    }

    const user = await userRepo.getUserById(decoded?.userId);
    if (!user) {
      return HandleResponse(
        res,
        401,
        MESSAGE_CODE.UNAUTHORIZED,
        MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED
      );
    }
    if (!roles.includes(user.role)) {
      return HandleResponse(
        res,
        403,
        MESSAGE_CODE.UNAUTHORIZED,
        MESSAGES.ERROR.FORBIDDEN.ROLE
      );
    }
    (req as RequestWithAccessToken).userId = decoded?.userId;
    next();
  };
