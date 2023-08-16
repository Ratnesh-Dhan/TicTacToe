import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  const [login, setLogin] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  const authenticate = () => {
    console.log("auth run");
    const user_token = localStorage.getItem("token");
    console.log({ user_token });
    if (!user_token) {
      console.log("if is running properly");
      return false;
    }
    console.log("if ended properly", user_token);
    return true;
  };

  useEffect(() => {
    const authenticated = authenticate();
    console.log({ authenticated });
    setLogin(authenticated);
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    console.log({ login });
    if (!initialLoad && !login) navigate("/login");
  }, [login,initialLoad, navigate]);

  return <div>{login ? props.children : null}</div>;
};

export default Auth;
