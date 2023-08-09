import { combineReducers } from 'redux'
import loginReducers from '../reducers/loginReducers'

const rootReducer = combineReducers({
    login:loginReducers
})

export default rootReducer