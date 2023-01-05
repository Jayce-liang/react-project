import { SAVE_CURRENTPAGE_PRODUCT_DETAIL } from "../action_types";

export const creatProductAction = (value) => {
  return { type: SAVE_CURRENTPAGE_PRODUCT_DETAIL,data:value};
};
