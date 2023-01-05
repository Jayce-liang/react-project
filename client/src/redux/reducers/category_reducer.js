import { SAVE_CATEGROYLIST } from "../action_types";
let initState ="";
export default function categoryReducer(preState = initState, action) {
  let { type, data } = action;
  let newState;
  switch (type) {
    case SAVE_CATEGROYLIST:
      newState = data;
      return newState;
    default:
      return preState;
  }
}
