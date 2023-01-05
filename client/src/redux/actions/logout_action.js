import { DELETE_USER_INFO } from "../action_types";

export const createDeleteUserInfoAction = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return { type: DELETE_USER_INFO};
};
