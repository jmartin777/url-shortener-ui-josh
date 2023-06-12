import React, { Component } from 'react';
import './App.css';
import apiCalls from '../../apiCalls';
import getUrls from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';
import { postUrl } from '../../apiCalls';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    };
  }

  componentDidMount() {
    getUrls()
    .then(data =>{
      console.log(data)
      this.setState({urls:[...data.urls]})
    })
    .catch(() => this.setState({error:"Loading Error!!"}))
  }
  addUrl = (newUrl) => {
    this.setState(prevState => ({
      urls: [...prevState.urls, newUrl]
    }));
    console.log(newUrl)
    postUrl(newUrl);
  }
  

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
