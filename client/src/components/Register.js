import axios from 'axios';
import React, { useState } from 'react'
import '../css/Loginregister.css';
import server from '../utils/server';

const Register = ({setRegister, register}) => {

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const reFresh = (val) => {
    //window.location.reload(true);
    alert(val);
  }
  const handleClicked = async() => {
    console.log("we are in handle register");
    const user = document.getElementById('mail').value;
    console.log(user);
    const pass = document.getElementById('pass').value;
    console.log(pass);
    const repass = document.getElementById('repass').value;
    if (pass !== repass) {
      reFresh("password didnt matched");
    }
    else if(pass.length < 5) {
      reFresh("password length needs to be more than 5 caracters");
      console.log(pass);
    }
    else
    try {
      console.log({user, pass});
      const {data} = await server.post('/registering', {
        user: username,
        pass: password
      });
      
      if(data.key){
        alert("successful register");
      }
      else {
        alert("user already exisits");
        window.location.reload(true);
      }
    }catch(e) {
        console.log("register failed in frontend side");
      }
    // else {
    //   axios.post('http://127.0.0.1:3003/registering', {
    //     user: user,
    //     pass: pass
    //   })
    //   setRegister(!register);
    // }
  }
  return (
    <div id="register">
        <h1>Register</h1>
        <div className='container'>
          <div className='input-space'>
            <label>Name </label>
            <input type='text' required/>
          </div>
          <div className='input-space'>
            <label>Mail </label>
            <input id="mail" type='text' value={username} onChange={(event)=>{setUsername(event.target.value)}} required/>
          </div>
          <div className='input-space'>
            <label>Password </label>
            <input id="pass" type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
          </div>
          <div className='input-space'>
            <label>ReEnter Pass </label>
            <input id="repass" type='password' required/>
          </div>
          <div className='input-space'>
            <button className='button' onClick={handleClicked}>Register</button>
          </div>
        </div>
    </div>
  )
}

export default Register