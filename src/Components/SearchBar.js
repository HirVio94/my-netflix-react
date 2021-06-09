import React, { Component } from 'react';
// import VideoListItem from './video-list-item';
// import React from 'react';

// class SearchBarClass extends React.component
class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: 'Search Bar',
            inputValue: '',

        };
        console.log('this.state', this.state);
    }

    handleChange(event) {
        console.log('this.state', this.state);
        this.setState({ inputValue: event.target.value });
    }

    render() {
        return (

            <div className="row">
                <div className="col-md-8">
                    <input
                    className="form-control input-lg" 
                        type="text"
                        placeholder={this.state.placeholder}
                        onChange={this.handleChange.bind(this)}
                    />
                    {/* <button>Send</button> */}
                    {/* <VideoListItem inputValue={this.state.inputValue}/> */}
                </div>

            </div>
        )
    }

}

export default SearchBar;