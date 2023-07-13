import {combineReducers, legacy_createStore} from "redux";
import {cardReducer} from "./card-reducer";
import {commentsReducer} from "./comments-reducer";


const rootReducer = combineReducers({
    card:cardReducer,
    comments:commentsReducer
})
export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
