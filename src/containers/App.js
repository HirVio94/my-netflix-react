// import logo from './logo.svg';
import '../App.css';
import Video from '../Components/Video';
import SearchBar from '../Components/SearchBar'
import VideoDetail from '../Components/video-detail';
import VideoList from './video-list'
import { Component } from 'react';
import axios from 'axios';

const API_KEY = 'api_key=b1bb009f89a909c0ae0b65bc17104e0e';
const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieList: {},
      currentMovie: {},
    };
  }

  componentWillMount() {
    this.initMovie();
  }

  initMovie() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function (res) {
      console.log(res);
      this.setState({
        movieList: res.data.results.slice(1, 6),
        currentMovie: res.data.results[0]
      }, function () {
        this.applyCurrentVideo();
      });
      console.log('this.state.movieList', this.state.movieList);
    }.bind(this));
  }

  applyCurrentVideo() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function (res) {
      console.log('Video Film', res);
      const youtubeKey = res.data.videos.results[0].key;
      let newCurrentMovieState = this.state.currentMovie;
      newCurrentMovieState.videoId = youtubeKey;

      this.setState({ currentMovie: newCurrentMovieState }, () => {
        console.log('currentMovieVideoId', this.state.currentMovie);
      })
    }.bind(this))
  }

  recevoirCallback(movie){
      this.setState({currentMovie: movie}, ()=>{
      this.applyCurrentVideo();
    });
  }
  render() {

    const verifList = () => {
      if (this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} callback={this.recevoirCallback.bind(this)}/>
      }
    }
    return (
      <div className="App">

        <h1>Hello world</h1>
        <SearchBar />
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
          </div>
          <div className="col-md-4">
            {verifList()}
          </div>
          
          
        </div>


        <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} date={this.state.currentMovie.release_date} />


      </div>
    );
  }


}

export default App;
