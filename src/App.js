import './App.css';
import Topic from './Topic.js'

function AppHeader() {

  const playMe = (soundFile) =>{
    let sound = new Audio(process.env.PUBLIC_URL + '/' +soundFile);
    sound.play();
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
        <div className='section'><img id="idiot" className="box" alt="kill" src={process.env.PUBLIC_URL + '/idiots/rutte.jpeg'} /> </div>
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
