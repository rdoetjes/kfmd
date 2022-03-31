import React, {useState} from 'react'
import './App.css';
import Topic from './Topic.js'
import {idiots} from './idiots.js'

function AppHeader() {
  const [newIdiot, setNewIdiot] = useState(getIdiot())

  function getIdiot(){
    let tempIdiot = idiots[Math.floor(Math.random() * idiots.length)]
    while (tempIdiot==newIdiot)
      tempIdiot = idiots[Math.floor(Math.random() * idiots.length)]
    return tempIdiot
  }

  const playMe = (soundFile) =>{
    let sound = new Audio(process.env.PUBLIC_URL + '/' +soundFile);
    sound.play();
    setNewIdiot(getIdiot)
  }

  return (
    <div className='KFMD'>
      <div className='grid'>
        <div className='section'></div>
        <div className='section'>
        <Topic topic="KILL" image="kill.png" onClick={() => {playMe("gunshot.mp3")}}/>
        </div>
        <div className='section'></div>

        <div className='section'>
        <Topic topic="FUCK!" image="fuck.png" onClick={() => {playMe("orgasm.mp3")}}/>
        </div>
        <div className='section'><img id="idiot" className="box" alt="kill" src={process.env.PUBLIC_URL + "/idiots/" + newIdiot} /> </div>
        <div className='section'>
        <Topic topic="MARRY" image="marry.png" onClick={() => {playMe("sucker.mp3")}} />
        </div>

        <div className='section'></div>
        <div className='section'>
        <Topic topic="DUMP" image="dump.png" onClick={() => {playMe("dumped.mp3")}}/>
        </div>
        <div className='section'></div>
      </div>
    
    </div>
  );
}

export default AppHeader;
