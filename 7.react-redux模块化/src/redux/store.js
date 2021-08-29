//用于创建store对象
import {applyMiddleware, createStore} from "redux"
//引入reducers
import reducers from './reducers'
import thunk  from "redux-thunk"

//引入redux-devtools-extension
import {composeWithDevTools} from "redux-devtools-extension"
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));