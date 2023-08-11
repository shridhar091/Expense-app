import { ADD_EXPENSE, DELETED_EXPENSE, EDIT_EXPENSE, GET_TABLE, REMOVE_EXPENSE, UNDO_EXPENSE,DELETE_EXPENSE } from "../actions/expenseAction"

const expenseIntialState = {
    error:{},
    data:[],
    deletedData: []
}

const expenseReducer = (state = expenseIntialState, action)=>{
    switch(action.type){
        case ADD_EXPENSE:{
            return {...state, data:[action.payload, ...state.data]}
        }
        case GET_TABLE:{
            return {...state,data:action.payload}
        }
        case EDIT_EXPENSE:{
                return {...state, data:[...state.data.map(ele=>{
                    if(ele._id===action.payload._id){
                        return {...ele , ...action.payload}
                    }else{
                        return {...ele}
                    }
                })]}
        }
        case REMOVE_EXPENSE:{
            return{...state,data:[...state.data.filter(e=>e._id!==action.payload._id)]}
        }
        case DELETED_EXPENSE:{
            return{...state,deletedData:action.payload}
        }
        case UNDO_EXPENSE:{
            return{...state,deletedData:[...state.deletedData.filter(e=>e._id!==action.payload._id)]}
        }
        case DELETE_EXPENSE:{
            return{...state,data:action.payload}
        }

        default :{
            return {...state}
        }
    }
}

export default expenseReducer