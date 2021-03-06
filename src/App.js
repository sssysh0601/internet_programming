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
import Postpage from "./Components/Postpage";
import UpdatePost from "./Components/UpdatePost";
import Posting from "./Components/Posting";
import Notice from "./Components/Notice";
import signup from "./Components/Signup";
import mypage from "./Components/Mypage";
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
<Route exact={true} path="/signup" component={signup} />
<Route exact={true} path="/Postpage/:key" component={Postpage} />
<Route exact={true} path="/Postpage/" component={Postpage} />
<Route exact={true} path="/Posting/:post_id" component={Posting} />
<Route exact={true} path="/Notice" component={Notice} />
<Route exact={true} path="/UpdatePost/:post_id" component={UpdatePost} />
<Route exact={true} path="/mypage" component={mypage} />
      </div>
    )
  }
}


