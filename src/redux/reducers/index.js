//汇总reducer
import counter_reducer from "./counter_reducer";
import person_reducer from "./person_reducer";

import { combineReducers } from "redux";

//接受一个对象作为参数，该对象的key就是store中保存该状态的key
//参数对象中的value，就是store中保存该状态的value
export default combineReducers({
  count: counter_reducer,
  person: person_reducer,
});
