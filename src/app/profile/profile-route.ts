import { Router } from "express";
import { getProfileController } from "./profile-controller";
import { CatchWrapper } from "../../utils/CatchWrapper";

const route = Router()

route.get('/', CatchWrapper(getProfileController))

export default route