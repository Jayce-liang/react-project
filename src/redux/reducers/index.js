import {combineReducers} from "redux"
import login_reducers from "./login_reducers"

export default combineReducers({
    userInfo:login_reducers
})
