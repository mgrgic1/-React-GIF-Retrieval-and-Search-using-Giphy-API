import React, {Component} from 'react';
import axios from 'axios';

class GifResults extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            searchedGifs: [],
            trendingGifs: [],
            randomGif: {},
        }

    }

    componentDidMount() {
        axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=McmaJepHYwZUwZURdJXl9S4gnslJKG9v`)
        .then(pageRes => {
            //nested data in the api? for some reason
            this.setState({trendingGifs: pageRes.data.data})
        });
        
        axios.get(`http://api.giphy.com/v1/gifs/random?api_key=McmaJepHYwZUwZURdJXl9S4gnslJKG9v`)
        .then(pageResRand => {
            this.setState({randomGif: pageResRand.data.data})
        });

    }

    fetchGifFromSearch = (query) => {
        axios.get(`http://api.giphy.com/v1/gifs/search?q=`+query.replace(" ","+")+`&api_key=McmaJepHYwZUwZURdJXl9S4gnslJKG9v`)
        .then(pageResSearch => {
            this.setState({foundResult: true})
            this.setState({searchedGifs: pageResSearch.data.data})
        },this.buildLayoutSearchGif())
        .catch(error => {
            this.setState({foundResult: false})
        })
    }


    buildLayoutSearchGif = () => {
        return (
            <div className = "searchedGifs">
            {this.state.searchedGifs.map(gif => <img onClick = {() => {window.open(gif.url)}} key = {gif.id} src = {gif.images.fixed_height.url}></img>)}
            </div>
        )
    }


    buildLayoutTrendingGif = () => {
        return (
            <div className = "trendingGifResults">
                {this.state.trendingGifs.map(gif => 
                <img onClick = {() => {window.open(gif.url)}} key = {gif.id} src = {gif.images.fixed_height.url}>
                    
                </img>)}
            </div>
        ) 
    }

    buildLayoutRandGif = () => {

        if(this.state.randomGif != null) {
        return (
            <div className = "randomGifResult">
                <center>
                <img onClick = {() => {window.open(this.state.randomGif.url)}} src = {this.state.randomGif.image_url}></img>
                </center>
            </div>
        )
        }
        else {
            return (
                <div>
                    <p>Fetching...</p>
                </div>
            )
        }
    }    

    generateNewGif = () => {
        axios.get(`http://api.giphy.com/v1/gifs/random?api_key=McmaJepHYwZUwZURdJXl9S4gnslJKG9v`)
        .then(pageResRand => {
            this.setState({randomGif: pageResRand.data.data})
        },this.buildLayoutRandGif());
    }


    render() {
        var newDate = new Date();

        return (
            <div>

            <div id = "searchGifs">
            {this.buildLayoutSearchGif()}
            </div>

            <div id = "trendingGifs">
            <h3>Trending as of {newDate.getMonth()+1}/{newDate.getDate()}/{newDate.getFullYear()}: </h3>
            {this.buildLayoutTrendingGif()}
            </div>

            <div id = "randomGifs">
            <h3>Random Gif: </h3>
                {this.buildLayoutRandGif()}
            <center><button onClick = {this.generateNewGif} style = {{marginBottom: '40px'}}>Get new GIF</button>
            </center>
            </div>

            </div>



        );



    }

}

export default GifResults;
