import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetUserDeletedExpense, startUndoExpense,startDeleteExpense } from "../actions/expenseAction";

const DeletedExpense=(props)=>{
    
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(startGetUserDeletedExpense())
        dispatch(startUndoExpense())
    },[dispatch])

    const expenses = useSelector((state)=>{
        return state.expense.deletedData
    })
    // console.log(expenses,'delet')

    const handleUndoExpense=(id)=>{
        // console.log(startUndoExpense(id),'clicked')
        if(window.confirm('Are you Sure?')){
        dispatch(startUndoExpense(id))
        }
    }

    const handleDeleteExpense= (id)=>{
        if(window.confirm('Are you sure?')){
            dispatch(startDeleteExpense(id))
        }
    }

    return(
        <div>
            <hr/>
            <h3>Recently deleted Expense</h3>
            <table border='2'>
                <thead >
                    <tr>
                        <th>Note</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses&&expenses.map(e=>{
                            return(
                                <tr>
                                    <td>{e.note}</td>
                                    <td>{e.amount}</td>
                                    <td>{e.date.split("T")[0]}</td>
                                    <td><button onClick={()=>{handleUndoExpense(e._id)}}>Undo</button></td>
                                    <td><button onClick={()=>{handleDeleteExpense(e.id)}}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DeletedExpense