import { SAVE_CURRENTPAGE_PRODUCT_DETAIL } from "../action_types";


let initState ="";
export default function product_reducer(preState = initState, action) {
  let { type, data } = action;
  let newState;
  switch (type) {
    case SAVE_CURRENTPAGE_PRODUCT_DETAIL:
      newState = [...data];
      return newState;
    default:
      return preState;
  }
}
