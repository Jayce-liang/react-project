//用于创建store对象
import {applyMiddleware, createStore} from "redux"
//引入reducers
import reducers from './reducers'
import thunk  from "redux-thunk"

export default createStore(reducers,applyMiddleware(thunk));