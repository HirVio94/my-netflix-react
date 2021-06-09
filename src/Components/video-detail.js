import React from 'react';

const VideoDetail = (props)=>{
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <h5>{props.date}</h5>
        </div>
        
        
    )
}

export default  VideoDetail;