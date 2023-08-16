import React, {useEffect} from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import authContext from "../context/notes/authContext";
import If from "./If";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = React.useContext(authContext);
  //console.log({auth});
  useEffect(() => {
    if(!auth.game)
    console.log("game true")  
    //return null;
  },[]);
  return (
    <div className="navbar">
      
      <If 
        condition={!auth.loggedin}
        then={
          <li className="link">
        <Link to="/">Home</Link>
      </li>
        }
      />

      <If 
        condition={(auth.loggedin && auth.game)}
        then={
      <li className="link">
        <Link to="/iverify">Iverify</Link>
      </li>
        }
      />

      <If
        condition={!auth.loggedin}
        then={
          <li className="link">
            <Link to="/login">Login</Link>
          </li>
        }
        else={
          <li className="link">
            <div onClick={() => {
                auth.logout();
                localStorage.clear();
                navigate('/');
              }} >
              log out
            </div>
          </li>
        }
      />

      <If
        condition={!auth.loggedin}
        then={
          <li className="link">
            <Link to="/register">Register</Link>
          </li>
        }
      />
      {/* <If condition={auth.loggedin} then={
        <li className="link">
          <div onClick={() => { auth.logout();
          localStorage.clear() }}>
            log out
          </div>
        </li>
      } /> */}
    </div>
  );
};

export default Navbar;

// {/* {!auth.loggedin ? (
//         <li className="link">
//           <Link to="/login">Login</Link>
//         </li>
//       ) : null} */}
