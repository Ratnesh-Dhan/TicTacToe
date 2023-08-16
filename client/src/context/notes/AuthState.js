import { useEffect, useState } from "react";
import server from "../../utils/server";
import authContext from "./authContext";

const AuthState = (props) => {
  const [name, setName] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [game, setGame] = useState(false);
  
  const verifyToken = async() => {
    const token = localStorage.getItem('token');
    if(token) {
        const {data} = await server.get(`/auth/${token}`);
        if(data.verify) {
            setName(data.decode);
            setLoggedin(true);
        }
    }
    else {
        setName("");
        setLoggedin(false);
    }
  }

  useEffect(() => {
    verifyToken();
  },[])
  const state = {
    name: name,
    loggedin: loggedin,
    game: game,

    setGamevalue: (flag) => {
      setGame(flag);
    },
    
    setLogin: (name) => {
      if (name) {
        setName(name);
        setLoggedin(true);
      } else {
        setName("");
        setLoggedin(false);
      }
    },
    logout: () => {
        setName("");
        setLoggedin(false);
    }
  };
  return (
    <authContext.Provider value={state}>{props.children}</authContext.Provider>
  );
};

export default AuthState;
