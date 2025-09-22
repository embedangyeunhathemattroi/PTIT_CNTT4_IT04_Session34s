import { combineReducers } from "redux";
import { reducerStudent } from "./reducerStudent";

export const rootReducer = combineReducers({
    students:reducerStudent
})