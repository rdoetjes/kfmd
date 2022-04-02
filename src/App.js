import React, {Component, setState} from 'react'
import './App.css';
import Topic from './Topic.js'
import {celebs} from './celebs.js'
import mqtt from 'mqtt'
class AppHeader extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      newCeleb: celebs[Math.floor(Math.random() * celebs.length)],
      alreadyHad: [],
      isDisabled: false
    }
  }

  componentDidMount(){

  }

  getCeleb(celebs) {  
    if (this.state.alreadyHad && !this.state.alreadyHad.includes(this.state.newCeleb))
      this.state.alreadyHad.push(this.state.newCeleb)
 
    let tempCeleb = celebs[Math.floor(Math.random() * celebs.length)]
    
    if (this.state.alreadyHad && this.state.alreadyHad.length >= celebs.length){
      this.setState({isDisabled: true});
      return "done.jpeg"
    }

    while (this.state.alreadyHad && this.state.alreadyHad.includes(tempCeleb))
      tempCeleb = celebs[Math.floor(Math.random() * celebs.length)]
    
    this.state.alreadyHad.push(tempCeleb);

    return tempCeleb
  }

  playMe(soundFile, celebs, alreadyHad){
    let sound = new Audio(process.env.PUBLIC_URL + '/' +soundFile);
    sound.play();
    let tempCeleb = this.getCeleb(celebs, alreadyHad);
    this.setState({newCeleb: tempCeleb});
  }

  render(){
  return (
      <div className='KFMD'>
        <div className='grid'>
          <div className='section'></div>
          <div className='section'>
            <Topic topic="KILL" image="kill.png" disabled={this.state.isDisabled} onClick={() => {this.playMe("gunshot.mp3", celebs, this.state.alreadyHad)}}/>
          </div>
          <div className='section'></div>

          <div className='section'>
            <Topic topic="FUCK!" image="fuck.png" disabled={this.state.isDisabled} onClick={() => {this.playMe("orgasm.mp3", celebs, this.state.alreadyHad)}}/>
          </div>
          <div className='section'><img id="idiot" className="box" alt="kill" src={process.env.PUBLIC_URL + "/celebs/" + this.state.newCeleb} /> </div>
          <div className='section'>
            <Topic topic="MARRY" image="marry.png" disabled={this.state.isDisabled} onClick={() => {this.playMe("sucker.mp3", celebs, this.state.alreadyHad)}} />
          </div>

          <div className='section'></div>
          <div className='section'>
            <Topic topic="DUMP" image="dump.png" disabled={this.state.isDisabled} onClick={() => {this.playMe("dumped.mp3", celebs, this.state.alreadyHad)}}/>
          </div>
          <div className='section'></div>
        </div>
      
      </div>
    );
  }
}

export default AppHeader;
