import Counter from "../components/counter";
import { connect } from "react-redux";
import { createIncrement, createDecrement,createIncrementAsync } from "../redux/createAction.js";



export default connect((state) => ({ count: state }), {
  increment: createIncrement,
  decrement: createDecrement,
  incrementAsync:createIncrementAsync
})(Counter);


//connect 底层帮你添加上了dispatch，和value
