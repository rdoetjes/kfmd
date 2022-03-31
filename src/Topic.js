function Kill(props) {
    return (
        <div>
            {props.topic}
            <img height={50} alt={props.topic} src={process.env.PUBLIC_URL + '/'+props.image} />
        </div>
    );
}

export default Kill;