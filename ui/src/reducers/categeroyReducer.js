import { ADD_CATEGORY, REMOVE_CATEGORY, SET_CATEGORY } from "../actions/createAction";

const intialCategoryState = {
    data:[],
    error:{}
}

const catageroyReducer = (state= intialCategoryState,action)=>{
    switch(action.type){
        case ADD_CATEGORY:{
            return {...state, data:[action.payload,...state.data]}
        }
        case SET_CATEGORY:{
            return {...state, data:action.payload}
        }
        case REMOVE_CATEGORY:{
            return{...state,data:[...state.data.filter(e=>{
                return e._id!==action.payload._id
            })]}
        }
        default:{
            return{...state}
        }
    }
}

export default catageroyReducer