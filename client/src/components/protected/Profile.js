import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getName } from '../../utils/playerAPIs';
import io from 'socket.io-client';
import authContext from '../../context/notes/authContext';
import MainGame from './MainGame';

const socket = io.connect("http://localhost:3005");

const Profile = () => {

  const reff = useRef(null);
  const [val, setVal] = useState("");
  const [challenge, setChallenge] = useState("waiting for any challenge");
  const [challenger, setChallenger] = useState("");
  const navigate = useNavigate();
  const gamelog = useContext(authContext);

    const content =async () => {
      
        try {
            const response =await getName();
            if(response.data.error){
              setVal(response.data.error);
            }
            else
              setVal(response.data);
        }
        catch (e) {
            setVal(e.message);
        }
    }

    const handleClick =() => {
      socket.emit("search", {challenger: val, rival: reff.current.value});
      
    }

    const startGame = () => {
      gamelog.setGamevalue(true);
      navigate('/maingame');
    }


    useEffect(() => {
      content();
      socket.on("searchPlayer", (data) => {
        console.log({data, val})
        if(data.rival === val) {
          setChallenger(data.challenger);
          setChallenge(data.challenger+" has challenged you for duel");
        }
      })
    },[socket, val]);

  return (
    <div>
      <h2>This is profile page</h2>
      <h1>Hi { val } lets rock !</h1>
        <div>
          <label>Challenge user</label>
          <input ref={reff} type="text" id="opponent" required/>
          <button onClick={handleClick}>Challenge</button>    
        </div>
        <div id="received-challenge">
          {challenge}
        </div>
        { challenger !=='' ?<div id="challenge-start-button">
          <button id="challenge-button" onClick={startGame}>Start</button>
        </div>: null}
      </div>
  )
}

export default Profile