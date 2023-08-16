import React, { useState } from 'react'
import io from 'socket.io-client';
import authContext from '../../context/notes/authContext';

const ary = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
//const socket = io.connect("http://localhost:3005");

const MainGame = () => {

  const [btnstate, setBtnstate] = useState(0);
  const myData = React.useContext(authContext);

  const handleGame = (i) => {
    console.log(i);
    setBtnstate(i);
    //socket.emit("send", {message: i, join: myData.name});
  };

  const handleQuit = () => {
    console.log("quiting");
  };

  return (
    <>
      <div className="tiktaktoe">
          <div className="tikgame">
            {ary.map((a, i)=>(
              <button className="buttongame" onClick={()=>{handleGame(i)}} key={i}>{i}</button>
            ))}
          </div>
      </div>
      <div id="turns"><h2>whose turn ?</h2></div>
      <div>
        <button onClick={()=> {handleQuit()}}>I quit</button>
      </div>
    </>
  )
}

export default MainGame