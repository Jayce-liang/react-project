import {combineReducers} from "redux"
import loginReducers from "./login_reducers"
import saveTitleReducer from "./saveTitle_reducer"
import productReducer from "./product_reducer"
import categoryReducer from "./category_reducer"

export default combineReducers({
    userInfo:loginReducers,
    title:saveTitleReducer,
    productList:productReducer,
    categoryList:categoryReducer
})
