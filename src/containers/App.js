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
const SEARCH_URL = "search/movie?language=fr&include_adult=false";

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
      if (res.data.videos && res.data.videos.results[0]) {
        const youtubeKey = res.data.videos.results[0].key;
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey;

        this.setState({ currentMovie: newCurrentMovieState }, () => {
          console.log('currentMovieVideoId', this.state.currentMovie);
        })
      }
      this.setRecommendation();
    }.bind(this))
  }

  recevoirCallback(movie) {
    this.setState({ currentMovie: movie }, () => {
      this.applyCurrentVideo();
    });
  }

  onclickSearch(text) {
    console.log(text);
    axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${text}`).then(function (res) {
      console.log('res-search', res)
      if (res.data && res.data.results) {
        if (res.data.results[0].id !== this.state.currentMovie.id) {
          this.setState({ currentMovie: res.data.results[0] }, () => {
            this.applyCurrentVideo();
          })
        }
      }
    }.bind(this))
  }

  setRecommendation(){
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function (res){
      this.setState({movieList: res.data.results.slice(0,5) },)
    }.bind(this));
  }
  render() {

    const verifList = () => {
      if (this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} callback={this.recevoirCallback.bind(this)} />
      }
    }
    return (
      <div className="App">

        <h1>My Netflix</h1>
        <SearchBar callback={this.onclickSearch.bind(this)} />
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} date={this.state.currentMovie.release_date} />
          </div>
          <div className="col-md-4">
            {verifList()}
          </div>


        </div>


        


      </div>
    );
  }


}

export default App;
