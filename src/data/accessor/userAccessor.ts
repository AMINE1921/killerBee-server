import User from "../models/userModel";
import UserInterface from "../../interfaces/userInterface";
import logger from "../../utils/logger";

const getUserByEmail = async (mail: string) =>
  await User.findOne({ mail: mail }).catch((err: any) => {
    logger.error(`Error in getUserByCredentials: ${mail}:\n${err}`);
  });

const createUser = async (newUser: UserInterface) => {
  const user = new User({
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    password: newUser.password,
    mail: newUser.mail,
    roles: newUser.roles,
  });
  
  try {
    await user.save();
  } catch (err) {
    logger.error(`Error in createUser: \n${err}`);
    throw err;
  }
};

const getAllUsers = async () =>
  await User.find({}, { password: 0 }).catch((err: any) => {
    logger.error(`Error in getAllUsers: \n${err}`);
  });

const getUserById = async (id: string) =>
  await User.findOne({ _id: id }, { password: 0 })
  .populate([{
    path: 'referrerId',
    model: 'User' }])
  .catch((err: any) => {
    logger.error(`Error in getUserById: ${id}:\n${err}`);
  });

const updateUserById = async (user: UserInterface) =>
  await User.findOneAndUpdate(
    { _id: user.userId },
    {
      firstname: user.firstname,
      lastname: user.lastname,
      mail: user.mail
    },
    { new: true }
  ).select({ password: 0 });

const deleteUserById = async (id: string) =>
  await User.findOneAndRemove(
    { _id: id }
  );

const addUserRole = async (user: UserInterface) =>
  await User.findOneAndUpdate(
    { _id: user.userId },
    {
      roles: user.roles
    },
    { new: true }
  ).select({ password: 0 });

export {
  getUserByEmail,
  getUserById,
  createUser,
  updateUserById,
  getAllUsers,
  deleteUserById,
  addUserRole
};
