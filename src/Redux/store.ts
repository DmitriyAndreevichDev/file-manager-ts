import {combineReducers, createStore} from "redux";
import {filesReducer} from "./filesReducer";


const reducers = combineReducers({
    files: filesReducer,

});

export type ReducersType = ReturnType<typeof reducers>

const store = createStore(reducers);

export default store
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()