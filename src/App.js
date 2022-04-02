import React, {Component} from 'react'
import './App.css';
import Topic from './Topic.js'
import {celebs} from './celebs.js'
import mqtt from 'mqtt'

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      newCeleb: celebs[Math.floor(Math.random() * celebs.length)],
      alreadyHad: [],
      isDisabled: false,
      statusBar: "DISCONNECTED"
    }
  }

  componentDidMount(){
    const options = {
      clientId: 'phonax',
      username: 'phonax',
      password: 'Phonax01'
    }

    //todo make a wss (ssl)
    this.client = mqtt.connect("ws://192.168.178.77:9001", options);

    this.client.on("connect", ()   => {
      console.log("CONNECTED");
      this.setState({statusBar: "CONNECTED"});
      this.client.subscribe("kfmd_pub");
      this.setState({statusBar: "READY"});
    });

    this.client.on("message", (topic, message) => {
      console.log(message.toString());
      this.callEvent(message.toString());
    });
  }

  componentWillUnmount(){
    this.setState({statusBar: "DISCONNECTED"});
    this.client.end();
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
    if (this.state.isDisabled){
      this.setState({statusBar: "GAME OVER"})
      return;
    }
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
      this.setState({statusBar: "GAME OVER"});
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
          <div>STATUS: {this.state.statusBar}</div>
        </div>
      </div>
    );
  }
}

export default App;
