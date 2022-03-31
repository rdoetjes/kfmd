function Topic(props) {

    const playSound = () => {
        let sound = new Audio(process.env.PUBLIC_URL + "/" + props.sound)
        sound.play()
      }
    
    return (
        <div>
            <button onClick={() => playSound()}>
                {props.topic}
                <img height={50} alt={props.topic} src={process.env.PUBLIC_URL + '/'+props.image} />
            </button>
        </div>
    );
}

export default Topic;