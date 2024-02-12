import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const[credentials, setCredentials]=useState({email: "", password: ""});
    let navigate=useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("https://inotebook-leed.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          if(json.sucess){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Sucessfully logged in", "success");
          }
          else{
            props.showAlert("Invalid details", "danger");
          }
        }
          const onChange=(e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div className="container my-3">
            <div className="text-center">
            <h1>Welcome to iNotebook</h1>
            <h2>Please Login to access your notes</h2>
            <h4>If you're a new user, please Sign Up</h4>
            </div>
            <form className="my-4 d-flex flex-column text-center align-items-center" onSubmit={handleSubmit}>
                <div className="mb-3 w-25">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 w-25">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" />
                </div>

                <button type="submit" className="btn btn-primary w-25">Submit</button>
            </form>
        </div>
    )
}

export default Login
