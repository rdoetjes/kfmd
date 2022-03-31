import React from 'react'

function Topic({onClick, disabled, ...props }) {

    return (
        <div>
            <button disabled={disabled} onClick={onClick}>
                {props.topic}
                <img height={50} alt={props.topic} src={process.env.PUBLIC_URL + '/'+props.image} />
            </button>
        </div>
    );
}

export default Topic;