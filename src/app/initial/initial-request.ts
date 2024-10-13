import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const initialUserSchema = Joi.object({
  name: Joi.string().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.NAME,
  }),
  email: Joi.string().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.EMAIL,
  }),
  password: Joi.string().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.PASSWORD,
  }),
});
