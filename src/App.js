import React, {Component} from 'react'
import './App.css';
import Topic from './Topic.js'
import {celebs} from './celebs.js'
import mqtt from 'mqtt'
import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';

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
    //todo make a wss (ssl)
    this.client = mqtt.connect("ws://192.168.178.77:9001");

    this.client.on("connect", ()   => {
      console.log("connected");
      this.client.subscribe("kfmd_pub");
    });

    this.client.on("message", (topic, message) => {
      this.callEvent(message.toString())
    });
  }

  kill(){
    this.playMe("gunshot.mp3", celebs, this.state.alreadyHad);
  }

  fuck(){
    this.playMe("orgasm.mp3", celebs, this.state.alreadyHad)
  }

  dump(){
    this.playMe("dumped.mp3", celebs, this.state.alreadyHad);
  }

  marry(){
    this.playMe("sucker.mp3", celebs, this.state.alreadyHad);
  }

  callEvent(brokerMessage){
    if (this.state.isDisabled)
      return;
    
    var message= brokerMessage.toUpperCase();

    if (message === "UP" || message ==="U" || message === "K" || message === "KILL")
      this.kill();

    if (message === "DOWN" || message ==="D" || message === "DUMP")
     this.dump();
    
    if (message === "LEFT" || message ==="L" || message === "F" || message === "FUCK")
      this.fuck();
    
    if (message === "RIGHT" || message ==="R" || message === "M" || message === "MARRY")
    this.marry()

    console.log(message.toString());
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
    sound.muted = false;
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
            <Topic topic="KILL" image="kill.png" disabled={this.state.isDisabled} onClick={() => {this.kill()}}/>
          </div>
          <div className='section'></div>

          <div className='section'>
            <Topic topic="FUCK!" image="fuck.png" disabled={this.state.isDisabled} onClick={() => {this.fuck()}}/>
          </div>
          <div className='section'><img id="idiot" className="box" alt="kill" src={process.env.PUBLIC_URL + "/celebs/" + this.state.newCeleb} /> </div>
          <div className='section'>
            <Topic topic="MARRY" image="marry.png" disabled={this.state.isDisabled} onClick={() => {this.marry()}} />
          </div>

          <div className='section'></div>
          <div className='section'>
            <Topic topic="DUMP" image="dump.png" disabled={this.state.isDisabled} onClick={() => {this.dump()}}/>
          </div>
          <div className='section'></div>
        </div>
      
      </div>
    );
  }
}

export default AppHeader;
