import React from 'react'
import '../css/Loginregister.css';
import server from '../utils/server';
import { setAuthtokenheader } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import authContext from '../context/notes/authContext';
//import Cookies from 'js-cookie';

const Login = () => {

  const auth = React.useContext(authContext);
  const navigate = useNavigate();
  
  const handleClick = async() => {
    console.log("we are in login");
    const user = document.getElementById('mail').value;
    const pass = document.getElementById('pass').value;
    try {
      const {data} = await server.post('/login', {
        user: user,
        pass: pass
      });
      if(data.login) {
        alert("successfull login");
        console.log(data.token);
        localStorage.setItem("token", data.token);
        auth.setLogin(user);
        navigate('/profile');
      }
      else
        alert(data.error);
    }
    catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div id="login">
        <h1>Login</h1>
        <div className="container">
          <div className='input-space'>
          <label>Mail </label>
          <input type="text" id='mail' required/>
          </div>
          <div className='input-space'>
          <label>Password </label>
          <input type="password" id='pass' required/>
          </div>
          <div className='input-space'>
          <button className='button' onClick={ handleClick }>Submit</button>
          </div>
        </div>
    </div>
  )
}

export default Login