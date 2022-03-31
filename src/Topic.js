import React from 'react'

function Topic({onClick, ...props }) {

    return (
        <div>
            <button onClick={onClick}>
                {props.topic}
                <img height={50} alt={props.topic} src={process.env.PUBLIC_URL + '/'+props.image} />
            </button>
        </div>
    );
}

export default Topic;