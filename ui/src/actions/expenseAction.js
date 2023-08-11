import axios from "axios";
import { toast } from "react-toastify";

export const ADD_EXPENSE = "ADD_EXPENSE";
export const DISPLAY_EXPENSE='DISPLAY_EXPENSE'
export const GET_TABLE='GET_TABLE'
export const EDIT_EXPENSE='EDIT_EXPENSE'
export const REMOVE_EXPENSE='REMOVE_EXPENSE'
export const DELETED_EXPENSE='DELETED_EXPENSE'
export const UNDO_EXPENSE='UNDO_EXPENSE'
export const DELETE_EXPENSE='DELETE_EXPENSE'

export const addExpense = (expense) => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};

export const editExpense=(expense)=>{
  return{
    type:EDIT_EXPENSE,
    payload:expense
  }
}

export const getTable=(displayTable)=>{
  return {
    type: GET_TABLE,
    payload : displayTable
  }
}

export const removeExpense=(expense)=>{
  return{
    type:REMOVE_EXPENSE,
    payload:expense
  }
}

const setDeletedExpense=(expense)=>{
  return{
    type:DELETED_EXPENSE,
    payload:expense
  }
}

const undoExpense=(expense)=>{
  return{
    type:UNDO_EXPENSE,
    payload:expense
  }
}

const deleteExpense=(expense)=>{
  return{
    type:DELETE_EXPENSE,
    payload:expense
  }
}

export const startAddExpenses = (formData) => {
  return (dispatch) => {
    (async () => {
      try {
        const table = await axios.post(
          "http://localhost:3091/user/expenses",
          formData,
          { headers: { authorization: localStorage.getItem("token") } }
        );
        if (table.data) {
          // console.log(table.data, "table data");
          toast.success('Expense added', {
            position: "top-right",
            autoClose: 1000,
            theme: "colored"
            });
          dispatch(addExpense(table.data))
        }
      } catch (err) {
        // alert(err.message);
        console.log(err,'err-display-expense')
      }
    })();
  };
};


export const getDisplayExpense = (id)=>{
  return(dispatch)=>{
    (async ()=>{
      try{
        const displayTable= await axios.get(`http://localhost:3091/user/expenses?type=alive`,{ headers: { authorization: localStorage.getItem("token")} })
        if(displayTable){
          // console.log(displayTable.data,"displayTable")
          dispatch(getTable(displayTable.data))
        }
      }catch(err){
        console.log(err,'err-display-table')
      }
    })()
  }
}

export const startEditUserExpense =(formData,id)=>{
  return(dispatch)=>{
    (async ()=>{
      try{
        const expense=await axios.put(`http://localhost:3091/user/expenses/${id}`,formData,{ headers: { authorization: localStorage.getItem("token")}})
        dispatch(editExpense(expense.data))
      }
      catch(error){
        console.log(error)
      }
    })()
  }
}

export const startRemoveUserExpense=(id)=>{
  return(dispatch)=>{
    (
      async()=>{
        try{
          const expense= await axios.delete(`http://localhost:3091/user/expenses/${id}?type=delete`,{ headers: { authorization: localStorage.getItem("token")}})
          dispatch(removeExpense(expense.data))
        }
        catch(err){
          console.log(err)
        }
      }
    )()
  }
}

export const startGetUserDeletedExpense=(id)=>{
  return(dispatch)=>{
    (async()=>{
      const expense = await axios.get(`http://localhost:3091/user/expenses?type=deleted`,{ headers: { authorization: localStorage.getItem("token")}})
      dispatch(setDeletedExpense(expense.data))
    })()
  }
}

export const startUndoExpense=(id)=>{
  return(dispatch)=>{
    (
      async()=>{
        const expense= await axios.delete(`http://localhost:3091/user/expenses/${id}?type=undo`,{ headers: { authorization: localStorage.getItem("token")}})
        dispatch(undoExpense(expense))
      }
    )()
  }
}

export const startDeleteExpense=(id)=>{
  return (dispatch)=>{
    (
      async()=>{
        const expense= await axios.delete(`http://localhost:3091/user/expenses/${id}?type=delete`,{ headers: { authorization: localStorage.getItem("token")}})
        dispatch(deleteExpense(expense))
      }
    )()
  }
}