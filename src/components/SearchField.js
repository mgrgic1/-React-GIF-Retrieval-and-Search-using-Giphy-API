import React, {Component} from 'react';
import axios from 'axios';
import GifResults from './GifResults'

class SearchField extends Component{

    constructor(props){
        super(props);

        this.inputRef = React.createRef();
        this.childRef = React.createRef();

        this.state = {
            searchQuery: ""
        }

    }


searchForGif = () => {
    this.setState({searchQuery: this.inputRef.current.value}, () => {this.childRef.current.fetchGifFromSearch(this.state.searchQuery)})
}

render() {
    return (

        <div>

        <div id = "searchArea">
            <center>
        <h3 style = {{display: 'inline'}}>Find GIF: </h3>
        <input type = "text"  ref = {this.inputRef} placeholder = "Ex: cute cats "/>
        <button onClick = {this.searchForGif} style = {{marginLeft: '5px'}}>Search</button>
        </center>
        </div>

        <GifResults ref = {this.childRef}/>

        </div>
    )
}






}

export default SearchField;
