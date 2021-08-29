//用于创建store对象
import {createStore} from "redux"
//引入reducers
import reducers from './reducers'

let store=createStore(reducers);

export default store; 