import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import { startRegisterUser } from '../actions/userAction';

function Register(props){
    const dispatch = useDispatch()
    const [userName,setUserName]= useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword]=useState('')

    const formData = {
      userName: userName,
      email:email,
      password:password,
    }
    
    const handleRegister=(e)=>{
        e.preventDefault()
        const reset =()=>{
          setUserName('')
          setEmail('')
          setPassword('')
        }
        dispatch(startRegisterUser(formData,props))
        reset ()
    }

    return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h2>Register</h2>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                          value={userName}
                          onChange={(e)=>{setUserName(e.target.value)}}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your Email"
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
                      <button className="btn btn-primary" onClick={handleRegister}>
                        Register
                      </button>
                    </div>
                  </div>
                </div>
            </div>  
    )
}
export default Register