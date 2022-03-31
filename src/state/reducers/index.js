import { combineReducers } from 'redux'
import taskReducer from './taskReducer'

const reducers = combineReducers({
    tasksList: taskReducer
})

export default reducers