import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { startGetUserCatagory } from "../actions/createAction";
import { startAddExpenses } from "../actions/expenseAction";


const ExpenseForm = (props)=>{

    const dispatch= useDispatch()

    const [note, setNote] = useState('')
    const [amount, setAmount] = useState('')
    const [catageoryId, setCatageoryId] = useState('')
    const [date,setDate]= useState('')

    useEffect(()=>{
        dispatch(startGetUserCatagory())
    },[dispatch])

    const category = useSelector((state) => {
        return state.catageory.data
    })

    const formData ={
        note:note,
        amount:amount,
        categoryId:catageoryId,
        date:date
    }

    const reset=()=>{
        setNote('')
        setAmount('')
        setCatageoryId('')
        setDate('')
    }

     
    const handleFormSubmit = (e) => {
        e.preventDefault() 
        dispatch(startAddExpenses(formData))
        reset()
      }

    return(
        <form>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                        <h2>Add Expense</h2>
                    </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Note</label>
                <input 
                    type="Note" 
                    class="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="Note"
                    value={note}
                    onChange={(e)=>{setNote(e.target.value)}}
                />
                <label for="exampleFormControlInput1" className="form-label">Amount</label>
                <input 
                    type="Number" 
                    class="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="Amount"
                    value={amount}
                    onChange={(e)=>{setAmount(e.target.value)}}
                />
                <label for="exampleFormControlInput1" className="form-label">Choose Category </label>
                <select className="form-select" aria-label="Default select example"
                    value={catageoryId}
                    onChange={(e)=>{setCatageoryId(e.target.value)}}
                >
                    <option selected>Open this for  select Category</option>
                    {
                    category&&category.map((ele) => (
                    <option key={ele._id} value={ele._id}>
                      {ele.name}
                    </option>
                  ))}
                    
                </select><br/>

                <label for="exampleFormControlInput1" class="form-label">Date</label>
                <input 
                    type="Date" 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    value={date}
                    onChange={(e)=>{setDate(e.target.value)}}
                />

                <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
               </div>
            </div>
        </div>
        </div>
        </form>
    )
}

export default ExpenseForm