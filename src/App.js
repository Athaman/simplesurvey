import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';
import firebase from 'firebase';

var config = {
   apiKey: process.env.REACT_APP_APIKEY,
   authDomain: process.env.REACT_APP_AUTHDOMAIN,
   databaseURL: "https://simplesurvey-c5126.firebaseio.com",
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
 };

firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: uuid.v1(),
      name: '',
      answers: {
        q1: '',
        q2: '',
        q3: '',
        q4: ''
      },
      submitted: false
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this)
  }

  handleNameSubmit(event){
    var name = this.refs.name.value;
    this.setState({ name: name }, function(){
      console.log(this.state);
    });
    event.preventDefault();
  }

  handleQuestionSubmit(event){
    firebase.database().ref('surveys/' + this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });

    this.setState({submitted: true}, function(){
      console.log('Questions submitted...')
    });
    event.preventDefault();
  }

  handleQuestionChange(event){
    var question = event.target.name;
    var answers = this.state.answers;
    answers[question] = event.target.value;

    this.setState({answers: answers}, function(){
      console.log(this.state);
    });
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>;
      questions = (
        <span>
          <h3>Survey Questions</h3>
          <form onSubmit={this.handleQuestionSubmit.bind(this)}>
            <div>
              <label>What is your favourite operating system?</label><br/>
              <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange}/>Windows<br/>
              <input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange}/>OSX<br/>
              <input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange}/>Linux<br/>
              <input type="radio" name="q1" value="Solaris" onChange={this.handleQuestionChange}/>Solaris<br/>
              <input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange}/>Other<br/>
            </div>
            <div>
              <label>What is your favourite brand?</label><br/>
              <input type="radio" name="q2" value="Sony" onChange={this.handleQuestionChange}/>Sony<br/>
              <input type="radio" name="q2" value="Samsung" onChange={this.handleQuestionChange}/>Samsung<br/>
              <input type="radio" name="q2" value="Panasonic" onChange={this.handleQuestionChange}/>Panasonic<br/>
              <input type="radio" name="q2" value="Vizio" onChange={this.handleQuestionChange}/>Vizio<br/>
              <input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange}/>Other<br/>
            </div>
            <div>
              <label>What is your favourite Smartphone brand?</label><br/>
              <input type="radio" name="q3" value="Samsung" onChange={this.handleQuestionChange}/>Samsung<br/>
              <input type="radio" name="q3" value="Apple" onChange={this.handleQuestionChange}/>Apple<br/>
              <input type="radio" name="q3" value="Nexus" onChange={this.handleQuestionChange}/>Nexus<br/>
              <input type="radio" name="q3" value="Blackberry" onChange={this.handleQuestionChange}/>Blackberry<br/>
              <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange}/>Other<br/>
            </div>
            <div>
              <label>What is your favourite CPU brand?</label><br/>
              <input type="radio" name="q4" value="Intel" onChange={this.handleQuestionChange}/>Intel<br/>
              <input type="radio" name="q4" value="AMD" onChange={this.handleQuestionChange}/>AMD<br/>
              <input type="radio" name="q4" value="Nvidia" onChange={this.handleQuestionChange}/>Nvidia<br/>
              <input type="radio" name="q4" value="ARM" onChange={this.handleQuestionChange}/>ARM<br/>
              <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange}/>Other<br/>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </span>
      )

    } else if(!this.state.name && this.state.submitted === false) {
      user = (
        <span>
          <h2>Please enter your name to begin the survery</h2>
          <form onSubmit={this.handleNameSubmit.bind(this)}>
            <input type="text" placeholder="Enter Name..." ref="name"/>
          </form>
        </span>
      )

    } else if(this.state.submitted === true){
      user = <h2> Thank You {this.state.name}</h2>
    }
    return (
      <div className="App">
        <header className="App-header text-center">
          <h1 className="App-title">Simple Survey</h1>
        </header>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
