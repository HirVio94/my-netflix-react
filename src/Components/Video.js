import React from 'react';
;


const Video = ({videoId}) => {

    const YOUTUBE_URL = 'https://www.youtube.com/embed/'
    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" height="400px" width="700px" src={`${YOUTUBE_URL}${videoId}`}/>
        </div>
    )
}

export default Video;

