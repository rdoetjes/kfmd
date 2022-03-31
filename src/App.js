import React, {useState} from 'react'
import './App.css';
import Topic from './Topic.js'
import {idiots} from './idiots.js'

function AppHeader() {
  
  const [newIdiot, setNewIdiot] = useState(idiots[Math.floor(Math.random() * idiots.length)])
  const [alreadyHad, addIdiot] = useState([])

  function getIdiot() {  
    if (alreadyHad && !alreadyHad.includes(newIdiot))
      addIdiot(alreadyHad => [...alreadyHad, newIdiot])
 
    let tempIdiot = idiots[Math.floor(Math.random() * idiots.length)]
    
    if (alreadyHad && alreadyHad.length >= idiots.length)
      return "done.jpeg"

    while (alreadyHad && alreadyHad.includes(tempIdiot))
      tempIdiot = idiots[Math.floor(Math.random() * idiots.length)]
    
    addIdiot(alreadyHad => [...alreadyHad, tempIdiot])

    return tempIdiot
  }

  const playMe = (soundFile, idiots, alreadyHad) =>{
    let sound = new Audio(process.env.PUBLIC_URL + '/' +soundFile);
    sound.play();
    setNewIdiot(getIdiot())
  }

  return (
    <div className='KFMD'>
      <div className='grid'>
        <div className='section'></div>
        <div className='section'>
        <Topic topic="KILL" image="kill.png" onClick={() => {playMe("gunshot.mp3", idiots, alreadyHad)}}/>
        </div>
        <div className='section'></div>

        <div className='section'>
        <Topic topic="FUCK!" image="fuck.png" onClick={() => {playMe("orgasm.mp3", idiots, alreadyHad)}}/>
        </div>
        <div className='section'><img id="idiot" className="box" alt="kill" src={process.env.PUBLIC_URL + "/idiots/" + newIdiot} /> </div>
        <div className='section'>
        <Topic topic="MARRY" image="marry.png" onClick={() => {playMe("sucker.mp3", idiots, alreadyHad)}} />
        </div>

        <div className='section'></div>
        <div className='section'>
        <Topic topic="DUMP" image="dump.png" onClick={() => {playMe("dumped.mp3", idiots, alreadyHad)}}/>
        </div>
        <div className='section'></div>
      </div>
    
    </div>
  );
}

export default AppHeader;
