import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import EditForm from "./editForm";
import {startRemoveUserExpense} from '../actions/expenseAction'

import {getDisplayExpense,startEditUserExpense} from "../actions/expenseAction";

const ExpenseTable = (props) => {

  const dispatch = useDispatch();

  const [btnClicked, setBtnClicked] = useState(false)
  const [editData, setEditData]= useState({})

  const expense = useSelector((state) => {
        return state.expense.data;
    });

  useEffect(() => {
    dispatch(getDisplayExpense());
    dispatch(startEditUserExpense())
  }, [dispatch]);

  const handleEditExpense=(e)=>{
   setBtnClicked(!btnClicked)
   setEditData(e)
    
  }

  const handleRemoveExpence =(id)=>{
    if(window.confirm('Are you Sure?')){
      dispatch(startRemoveUserExpense(id))
    }
  }
  

  return (
    <div className="text-center">
      {btnClicked&&<EditForm
          editData={editData}
      />}
        <h3>All Your Expense :)</h3>
        
      <table className="table table-striped table-bordered mx-auto" style={{width:'750px'}}>
          <thead>
            <tr>
              <th scope="col">Note</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expense&&expense.map((e) => {
              return (
                <tr>
                  <td>{e.note}</td>
                  <td>{e.date.split("T")[0]}</td>
                  <td>{e.amount}</td>
                  <button type="button" class="btn btn-success" onClick={()=>{handleEditExpense(e)}}>Edit</button>
                  <button type="button" class="btn btn-danger" onClick={()=>{handleRemoveExpence(e._id)}}>Remove</button>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  );
};

export default ExpenseTable;
