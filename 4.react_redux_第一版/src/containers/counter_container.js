import Counter from "../components/counter";
import {connect} from "react-redux"
import {createIncrement,createDecrement} from "../redux/createAction.js"
function mapStateProps(state){
    return {
        count:state
    }
}

function mapDispacthProps(dispacth){
    return{
        increment:(value)=>{dispacth(createIncrement(value))},
        decrement:(value)=>{dispacth(createDecrement(value))}
    }
}

//connect返回一个函数
export default connect(mapStateProps,mapDispacthProps)(Counter);



