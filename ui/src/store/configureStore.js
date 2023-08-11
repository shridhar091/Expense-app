import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import expenseReducer from '../reducers/expenseReducer'
import catageroyReducer from '../reducers/categeroyReducer'
const configureStore = ()=>{
    const store = createStore(combineReducers({
        user:userReducer,
        catageory:catageroyReducer,
        expense:expenseReducer
        
    }),applyMiddleware(thunk))
    return store
}

export default configureStore