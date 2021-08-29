//创建一个reducers
let initState = 19;
export default function reCount(preState = initState, action) {
  let { data, type } = action;
  let newState;
  switch (type) {
    case "add":
      newState = preState + data * 1;
      return newState;
    case "jian":
      newState = preState - data * 1;
      return newState;
    default:
      return preState;
  }
}
