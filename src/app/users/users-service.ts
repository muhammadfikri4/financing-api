import { userRepo } from "../../repository";
import { Query } from "../../interface/Query";
import { Meta } from "../../utils/Meta";
import { getUserDTOMapper, UserData } from "./user-mapper";

export const getUserService = async (query: Query) => {
  const { page = "1", perPage = "10" } = query;
  const [user, totalData] = await Promise.all([
    userRepo.getUsers(query),
    userRepo.getUsersCount(query),
  ]);
  const meta = Meta(Number(page), Number(perPage), totalData);
  const data = getUserDTOMapper(user as UserData[]);
  return { data, meta };
};
