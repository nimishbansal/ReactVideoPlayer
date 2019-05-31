import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideosList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyA6xD6udCmrwCvof4pikb0Waa45cY12D7c';



// create a new component. This component should produce some html
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo:null
        };


        this.videoSearch("khwaab");

    }


    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos)=> {
            this.setState(
                {
                    videos: videos,
                    selectedVideo:videos[0]
                });
            // this.setState({videos:videos});
        });
    }

    render(){

        const videoSearch = _.debounce((term) => {this.videoSearch(term)},300);

        return (<div>
                    <SearchBar onSearchTermChange={term=>videoSearch(term)}/>
                    <VideoDetail video={this.state.selectedVideo}/>
                    <VideosList
                        onVideoSelect={selectedVideo=>{
                            this.setState({selectedVideo})
                        }}
                        videos={this.state.videos}/>
                </div>)
    }

}
//Take this component's generated HTML and put it on the page (in the DOM)

ReactDOM.render(<App />, document.querySelector(".container"));
