import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createBudgetSchema = Joi.object({
    purpose: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.PURPOSE_BUDGET
    })
})