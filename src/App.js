import './App.css';
import Topic from './Topic.js'

function AppHeader() {

  return (
    <div className='KFMD'>
      <div className='grid'>
        <div className='section'></div>
        <div className='section'>
        <Topic topic="KILL" image="kill.png" sound="chainsaw.mp3" />
        </div>
        <div className='section'></div>

        <div className='section'>
        <Topic topic="FUCK!" image="fuck.png" sound="chainsaw.mp3"/>
        </div>
        <div className='section'><img className="box" alt="kill" src={process.env.PUBLIC_URL + '/rutte.jpeg'} /> </div>
        <div className='section'>
        <Topic topic="MARRY" image="marry.png" sound="chainsaw.mp3"/>
        </div>

        <div className='section'></div>
        <div className='section'>
        <Topic topic="DUMP" image="dump.png" sound="chainsaw.mp3"/>
        </div>
        <div className='section'></div>
      </div>
    
    </div>
  );
}

export default AppHeader;
