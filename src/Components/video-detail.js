import React from 'react';

const VideoDetail = (props)=>{
    return (
        <div className="mt-5">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <h5>{props.date}</h5>
        </div>
        
        
    )
}

export default  VideoDetail;