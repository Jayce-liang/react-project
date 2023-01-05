import { SAVE_CATEGROYLIST } from "../action_types";

export const createSaveCategoryList = (value) => {
  return { type: SAVE_CATEGROYLIST, data: value };
};
