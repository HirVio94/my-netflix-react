import React from 'react';
import VideoListItem from '../Components/video-list-item';


const VideoList = (props) => {
    // const movies = ['film 1', 'film 2', 'film 3', 'film 4'];
    let movieList = props.movieList;
    console.log('movieList', movieList);
    return (
        <div>

            <h1>VideoList</h1>

            <ul>
                {
                    /*  movies.map(movie => {
                         return <VideoListItem movie={movie}/>
                     }), */

                    movieList.map(movie => {
                        return <VideoListItem movie={movie} callback={recevoirCallback} />
                    })

                }

            </ul>
        </div>
    )
    function recevoirCallback(movie) {
        console.log('props recu', movie);
        props.callback(movie);
    }

    
}

export default VideoList;

