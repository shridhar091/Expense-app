import { useState , useEffect} from "react"
import { useDispatch,useSelector } from "react-redux";

import ExpenseForm from './expenseForm'
import ExpenseTable from "./expenseTable";
import {startAddCategory, startGetUserCatagory } from "../actions/createAction";


const Dashboard = ()=>{
    const dispatch= useDispatch()
    useEffect(()=>{
    dispatch(startGetUserCatagory())
    },[dispatch])

    const [newCategory, setNewCategory] = useState('');

    const handleAdd=(e)=>{
        e.preventDefault()
        const formData = {
            name:newCategory
        }
        const reset = ()=>{
            setNewCategory('')
        }
        dispatch(startAddCategory(formData))
        reset()
    }

    return (
        <div>
            <label><b>Add Catageroy</b></label><br/>
            <input 
                type="Name"
                placeholder="Add Catageory"
                value={newCategory}
                onChange={(e)=>setNewCategory(e.target.value)}
            />
            <button onClick={handleAdd} >Add</button><br/>

  
           <ExpenseForm/>
           <ExpenseTable/>
           
            </div>
    )
}

export default Dashboard