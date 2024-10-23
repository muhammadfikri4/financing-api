import { getUserDTOMapper, UserData } from "../users/user-mapper";
import { userRepository } from "../../repository";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";

export const getProfileService = async (userId: string) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  const data = getUserDTOMapper(user as UserData);
  return data;
};
