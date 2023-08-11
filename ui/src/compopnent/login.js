import { useState } from "react"
import { useDispatch } from "react-redux"
import { startLogin } from "../actions/userAction"

function Login(props){
    const dispatch=useDispatch()

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const formData ={
        email :email,
        password:password
    }

    const reset =()=>{
        setEmail('')
        setPassword('')
    }

    const handleLogin=(e)=>{
        e.preventDefault()
        dispatch(startLogin(formData,props))
        reset()
    }

    return(
        <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                <h2>Login</h2>
                 </div>
                    <div className="card-body">
                    <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    </div>
                    <button className="btn btn-primary" onClick={handleLogin}>
                    Login
                </button>
                </div>
                </div>
             </div>
        </div>
                
        )
    }
export default Login