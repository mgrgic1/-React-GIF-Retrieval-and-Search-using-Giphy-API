import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchField from './components/SearchField';

class App extends React.Component {

constructor(props){
  super(props);

  this.state = {

  }
  
}




render() {
  return (
    <div className="App">
     <h1>Giphy Search</h1>
      <SearchField/>



    </div>
  );
}
}

export default App;
