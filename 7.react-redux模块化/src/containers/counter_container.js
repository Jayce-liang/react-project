//ui组件
import Counter from "../components/counter";
import { connect } from "react-redux";
//action
import { createIncrement, createDecrement,createIncrementAsync } from "../redux/actions/counter_action";

/*
  state
  {
    count:,
    person:
  }
*/
export default connect((state) => ({ count: state.count,person:state.person}), {//这里的state是store里存的超级对象
  increment: createIncrement,
  decrement: createDecrement,
  incrementAsync:createIncrementAsync
})(Counter);


//connect 底层帮你添加上了dispatch，和value
