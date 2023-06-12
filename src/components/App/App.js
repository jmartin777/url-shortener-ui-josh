import React, { Component } from 'react';
import './App.css';
import apiCalls from '../../apiCalls';
import getUrls from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';


export class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(data =>{
      console.log(data)
      this.setState({urls:[...data.urls]})
    })
    .catch(() => this.setState({error:"Loading Error!!"}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
