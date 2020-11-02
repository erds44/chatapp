import './App.css';
import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login/login'
import Chat from './components/chat/index'
import { createBrowserHistory } from 'history'
import webSocket from "./components/websocket/Websocket";

const history = createBrowserHistory();

const App = () => {

    useEffect(() => {
        webSocket.onopen = () => {
            console.log("client connected");
        }
    }, []);

  return (
    <div className="App">
       <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/chat" exact component={Chat}/>
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
