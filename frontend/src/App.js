import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login'
import Chat from './components/chat/index'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();
const webSocket = new WebSocket("ws://localhost:4567/chatapp")
webSocket.onopen = () => {
   webSocket.send("21314"); // this method will trigger OnMessage in the backend
};
/*
webSocket.onmessage = (msg) => call method(msg);
*/

const App = () => {
  return (
    <div className="App">
       <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
