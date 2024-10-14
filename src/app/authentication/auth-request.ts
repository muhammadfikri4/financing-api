import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";
import { Role } from "app/users/constant";

export const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.NAME,
  }),
  email: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.EMAIL,
  }),
  password: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.PASSWORD,
  }),
  code: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.CODE,
  }),
  departmentId: Joi.number().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.DEPARTMENT,
  }),
  position: Joi.string().required().allow(Role).messages({
    "any.required": MESSAGES.ERROR.REQUIRED.NAME,
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.EMAIL,
  }),
  password: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.PASSWORD,
  })
});
