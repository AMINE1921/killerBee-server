import Blacklist from "../models/blacklistTokensModel";
import logger from "../../utils/logger";

const getToken = async (token: string) =>
  await Blacklist.findOne({ jwt: token }).catch((err: any) => {
    logger.error(`Error in getToken: ${token}:\n${err}`);
  });

const blacklistToken = async (token: string) => {
  const deniedJWT = new Blacklist({
    jwt: token,
  });

  try {
    await deniedJWT.save();
  } catch (err: any) {
    logger.error(`Error in blacklistToken: ${token}:\n${err}`);
    throw err;
  }
};

export { getToken, blacklistToken };
