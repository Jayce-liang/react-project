import {combineReducers} from "redux"
import login_reducers from "./login_reducers"
import saveTitle_reducer from "./saveTitle_reducer"

export default combineReducers({
    userInfo:login_reducers,
    title:saveTitle_reducer
})
