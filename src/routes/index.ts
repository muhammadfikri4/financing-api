import { Router, type Request, type Response } from "express";
import departmentRoute from "../app/department/department-route";
import initialRoute from "../app/initial/initial-route";
import authRoute from "../app/authentication/auth-route";
import userRoute from "../app/users/users-route";
import profileRoute from "../app/profile/profile-route";
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { MESSAGES } from "../utils/Messages";
import { VerifyToken } from "../middleware/verifyToken";

const route = Router();

route.use("/auth", authRoute);
route.use("/departments", VerifyToken(), departmentRoute);
route.use("/initial", initialRoute);
route.use("/users", VerifyToken(), userRoute);
route.use(
  "/profile",
  VerifyToken([
    "ADMIN",
    "FINANCE",
    "HEAD_OF_DIVISION",
    "MANAGER",
    "MANAGING_DIRECTOR",
  ]),
  profileRoute
);

route.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World 🚀" });
});

route.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    code: MESSAGE_CODE.NOT_FOUND,
    message: MESSAGES.ERROR.NOT_FOUND.ROUTE,
  });
});

export default route;
