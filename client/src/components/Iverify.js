import React, { useState } from 'react'
import api from '../utils/api';
import '../css/Iverify.css';

const Iverify = () => {

  const [ivalue, setIvalue] = useState("");
  const [iresult, setIresult] = useState('');

  const handleClick = async() => {
    setIresult(await api(ivalue));
  }

  return (
    <div>
        <h1>Verify your token</h1>
        <div>
        <div className="container">
            <label>Put your token in input box</label>
            <input type='text' value={ivalue} onChange={(e)=> {setIvalue(e.target.value)}}/>
            <button onClick={handleClick}>Submit</button>
        </div>
        </div>
        <div>
            <h2>
                {iresult.data}
            </h2>
        </div>
    </div>
  )
}

export default Iverify