import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
const reducers = combineReducers({
    user: authReducer,
    post: postReducer,
});

export default reducers;
