import React, {useState} from 'react'
import './App.css';
import Topic from './Topic.js'

function AppHeader() {
  const idiots = ['/idiots/rutte.jpeg', '/idiots/trudeau.webp', '/idiots/kurt.jpeg', '/idiots/schwab.jpeg']
  const [newIdiot, setNewIdiot] = useState(getIdiot())

  function getIdiot(){
    return idiots[Math.floor(Math.random() * idiots.length)]
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
        <div className='section'><img id="idiot" className="box" alt="kill" src={process.env.PUBLIC_URL + newIdiot} /> </div>
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
