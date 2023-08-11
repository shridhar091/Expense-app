import { SET_USER } from "../actions/userAction";

const userIntialState = {
  data:[],
  error:{}
}

const userReducer = (state = userIntialState, action) => {
    switch (action.type) {
      case SET_USER:{
        return {...state, data:action.payload}
      }
      default:{
        return {...state}
      }
        
    }
  };

export default userReducer