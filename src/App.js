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
      isGameOver: false,
      statusBar: "DISCONNECTED",
      animate: "none"
    }
  }

  componentDidMount(){
    const options = {
      clientId: 'phonax',
      username: 'phonax',
      password: 'Phonax01'
    }

    //todo make a wss (ssl)
    //Connect to Mosquitto broker's WebSocket 
    this.client = mqtt.connect("ws://192.168.178.77:9001", options);

    //Connect event handling
    this.client.on("connect", ()   => {
      this.setState({statusBar: "CONNECTED"});
      this.client.subscribe("kfmd_pub");
      this.setState({statusBar: "READY"});
    });

    //Message event handling
    this.client.on("message", (topic, message) => {
      this.callEvent(message.toString());
    });
  }

  componentWillUnmount(){
    this.setState({statusBar: "DISCONNECTED"});
    this.client.end();
  }

  //What action to perfotm with this celeb.
  performAction(Action){

    //you cannot click any buttons during animation
    this.setState({isDisabled: true});

    switch(Action.toUpperCase()){

      case "KILL":
        this.setState({animate: "up"});
        this.playMe("gunshot.mp3", celebs, this.state.alreadyHad);
        break;

      case "FUCK":
        this.setState({animate: "left"});
        this.playMe("orgasm.mp3", celebs, this.state.alreadyHad);
        break;

      case "MARRY":
        this.setState({animate: "right"});
        this.playMe("sucker.mp3", celebs, this.state.alreadyHad);
        break;
        
      case "DUMP":
        this.setState({animate: "down"});
        this.playMe("dumped.mp3", celebs, this.state.alreadyHad);
        break;
    }

    //wait for animation to finish before showing a new celeb to judge
    setTimeout(() => this.getNewCelebAfterMove(), 2000);
  }

  //Pickk a new celebrity after we've done moving the picture to the selected action and back in the center.
  getNewCelebAfterMove(){
    this.setState({animate: "none"});
    let tempCeleb = this.getCeleb(celebs, this.state.alreadyHad);
    this.setState({newCeleb: tempCeleb});
  }

  //Event handling from the broker message
  callEvent(brokerMessage){
    if (this.state.isGameOver){
      this.setState({statusBar: "GAME OVER"})
      return;
    }

    //cannot handle evens when  buttons are disabled.
    if (this.state.isDisabled)
      return;

    var message= brokerMessage.toUpperCase();

    if (message === "UP" || message ==="U" || message === "K" || message === "KILL")
      this.performAction("KILL");

    if (message === "LEFT" || message ==="L" || message === "F" || message === "FUCK")
      this.performAction("FUCK");
    
    if (message === "RIGHT" || message ==="R" || message === "M" || message === "MARRY")
      this.performAction("MARRY");

    if (message === "DOWN" || message ==="D" || message === "DUMP")
      this.performAction("DUMP");
  } 

  //Get a celeb that we have not already seen. When we have seen them all show the done.jpeg and set game to game over.
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
    this.setState({isDisabled: false});
    return tempCeleb
  }

  //Play the sound that is associated with the action. BEWARE the user has to have interacted with the DOM by clicking on the screen
  playMe(soundFile){
    let sound = new Audio(process.env.PUBLIC_URL + '/' +soundFile);
    sound.muted = false;
    sound.play();
  }

  //Render the very simply 4 button and picture UI
  render(){    
  return (
      <div className='KFMD'>
        <div className='grid'>
          <div className='section'></div>
          <div className='section'>
            <Topic topic="KILL" image="kill.png" disabled={this.state.isDisabled} onClick={() => {this.performAction("KILL")}}/>
          </div>
          <div className='section'></div>

          <div className='section'>
            <Topic topic="FUCK!" image="fuck.png" disabled={this.state.isDisabled} onClick={() => {this.performAction("FUCK")}}/>
          </div>
          <div className='section' id={this.state.animate}><img id="idiot" className="box" alt="kill" src={process.env.PUBLIC_URL + "/celebs/" + this.state.newCeleb} /> </div>
          <div className='section'>
            <Topic topic="MARRY" image="marry.png" disabled={this.state.isDisabled} onClick={() => {this.performAction("MARRY")}} />
          </div>

          <div className='section'></div>
          <div className='section'>
            <Topic topic="DUMP" image="dump.png" disabled={this.state.isDisabled} onClick={() => {this.performAction("DUMP")}}/>
          </div>
          <div className='section'></div>
          <div>STATUS: {this.state.statusBar}</div>
        </div>
      </div>
    );
  }
}

export default App;
