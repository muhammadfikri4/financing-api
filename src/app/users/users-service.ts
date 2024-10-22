import { userRepository } from "../../repository";
import { Query } from "../../interface/Query";
import { Meta } from "../../utils/Meta";
import { getUsersDTOMapper, UserData } from "./user-mapper";

export const getUserService = async (query: Query) => {
  const { page = "1", perPage = "10" } = query;
  const [user, totalData] = await Promise.all([
    userRepository.getUsers(query),
    userRepository.getUsersCount(query),
  ]);
  const meta = Meta(Number(page), Number(perPage), totalData);
  const data = getUsersDTOMapper(user as UserData[]);
  return { data, meta };
};
