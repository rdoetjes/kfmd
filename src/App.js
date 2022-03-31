import React, {useState} from 'react'
import './App.css';
import Topic from './Topic.js'
import {celebs} from './celebs.js'

function AppHeader() {
  
  const [newCeleb, setNewCeleb] = useState(celebs[Math.floor(Math.random() * celebs.length)])
  const [alreadyHad, addCeleb] = useState([])
  const [isDisabled, setDisabled] = useState(false)

  function getCeleb(celebs, alreadyHad) {  
    if (alreadyHad && !alreadyHad.includes(newCeleb))
      addCeleb(alreadyHad => [...alreadyHad, newCeleb])
 
    let tempCeleb = celebs[Math.floor(Math.random() * celebs.length)]
    
    if (alreadyHad && alreadyHad.length >= celebs.length){
      setDisabled(true)
      return "done.jpeg"
    }

    while (alreadyHad && alreadyHad.includes(tempCeleb))
      tempCeleb = celebs[Math.floor(Math.random() * celebs.length)]
    
    addCeleb(alreadyHad => [...alreadyHad, tempCeleb])

    return tempCeleb
  }

  const playMe = (soundFile, celebs, alreadyHad) =>{
    let sound = new Audio(process.env.PUBLIC_URL + '/' +soundFile);
    sound.play();
    setNewCeleb(getCeleb(celebs, alreadyHad))
  }

  return (
    <div className='KFMD'>
      <div className='grid'>
        <div className='section'></div>
        <div className='section'>
        <Topic topic="KILL" image="kill.png" disabled={isDisabled} onClick={() => {playMe("gunshot.mp3", celebs, alreadyHad)}}/>
        </div>
        <div className='section'></div>

        <div className='section'>
        <Topic topic="FUCK!" image="fuck.png" disabled={isDisabled} onClick={() => {playMe("orgasm.mp3", celebs, alreadyHad)}}/>
        </div>
        <div className='section'><img id="idiot" className="box" alt="kill" src={process.env.PUBLIC_URL + "/celebs/" + newCeleb} /> </div>
        <div className='section'>
        <Topic topic="MARRY" image="marry.png" disabled={isDisabled} onClick={() => {playMe("sucker.mp3", celebs, alreadyHad)}} />
        </div>

        <div className='section'></div>
        <div className='section'>
        <Topic topic="DUMP" image="dump.png" disabled={isDisabled} onClick={() => {playMe("dumped.mp3", celebs, alreadyHad)}}/>
        </div>
        <div className='section'></div>
      </div>
    
    </div>
  );
}

export default AppHeader;
