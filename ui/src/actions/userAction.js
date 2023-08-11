import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const SET_USER='SET_USER'

export const setUser =(user)=>{
    return{
        type:SET_USER,
        payload:user
    }
}

export const startLogin = (formData,props)=>{
    return async(dispatch)=>{
        
            try{
                const user = await axios.post(`http://localhost:3091/user/login`,formData)
                console.log(user.data)
                if(user.data.token){
                    localStorage.setItem('token',user.data.token)
                    // console.log(user.data.token,'after login')
                    toast.success('Login Successfully', {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored"
                        });
                    props.history.push("/dashboard")
                }  
                else{
                    toast.error('Invalid Email and Password', {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored"
                        });
                } 
            }
            catch(err){
                alert(err.message)
            }
        }
        
    }


export const startRegisterUser= (formData,props)=>{
    return async(dispatch)=>{
        try{
            const user = await axios.post('http://localhost:3091/user/register',formData)
            // console.log(user.data)
            if(user.data._message){
                // alert("error",user.data._message)
                toast.error('Error data required',user.data._message, {
                    position: "top-right",
                    autoClose: 1000,
                    theme: "colored"
                    });
            }else if(user.data.keyValue){
                alert('email aleready taken')
            }else if(user.data._id){
                // alert('Successfully REGISTERED your account')
                toast.success('Successfully registered', {
                    position: "top-right",
                    autoClose: 1000,
                    theme: "colored"
                    });
                   
                props.history.push('/login')
            }
            
        }
        catch(err){
            alert(err.message)
        }
    }
   
}

export const getUserAccount = ()=>{
    return async(dispatch)=>{
        try{
            const account= await axios.get('http://localhost:3091/user/account',{ headers: { authorization: localStorage.getItem("token")}})
            console.log(account.data,'account')
            dispatch(setUser(account.data))
        }
        catch(err){
            console.log(err)
        }
    }
}


export const startAddBudget =(formData)=>{
    return async(dispatch)=>{
        try{
            const budget= await axios.put('http://localhost:3091/user/update',formData, { headers: { authorization: localStorage.getItem("token")}})
            console.log(budget)
            dispatch(setUser(budget.data))
        }
        catch(err){
            console.log(err)
        }
    }
}

