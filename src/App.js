/*import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Component,useEffect } from 'react';
import Start from "./Components/Start";
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function App(){

  return (
<Route exact={true} path="/" component={Start} />
  );

}
export default App;*/

import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Start from "./Components/Start";
import login from "./Components/Login";
import signup from "./Components/Signup";
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
export default class App extends Component {
  state = {
    id : "",
  }

  handleChange =(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  render() {
    return (
      <div>
<Route exact={true} path="/" component={Start} />
<Route exact={true} path="/login" component={login} />
<Route exact={true} path="/signup" component={signup} />
      </div>
    )
  }
}


