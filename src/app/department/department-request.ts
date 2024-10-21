import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createDepartmentSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.NAME,
  }),
  isActive: Joi.boolean().optional().allow(null),
});

export const updateDepartmentSchema = Joi.object({
  name: Joi.string().optional().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.NAME,
  }),
  isActive: Joi.boolean().optional().allow(null),
});
