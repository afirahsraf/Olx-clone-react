import React from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { useState } from 'react';
import { auth } from '../../Firebase/config';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [Email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  const [Loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleLogin=async(e)=>{
    e.preventDefault();
   setLoading(true)
   
        try{
  //signin with email and password 
      await signInWithEmailAndPassword(auth,Email,Password)
      //show user logged in
      alert("Welcome buddy")
  // navigate into home
  navigate("/")
    }catch(err){
    alert(err.message)
    }finally {
      setLoading(false); // Stop the loading indicator once the login attempt is done
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
          onChange={(e)=>setEmail(e.target.value)}
            className="input"
            value={Email}
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            onChange={(e)=>setPassword(e.target.value)}
            value={Password}
            className="input"
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{
          navigate('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
