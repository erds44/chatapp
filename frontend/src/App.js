import './App.css';
import React ,{useRef} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login/login'
import Chat from './components/chat/index'
import { createBrowserHistory } from 'history'
import { useEffect } from 'react/cjs/react.production.min'
import webSocket from "./components/websocket/Websocket"
import { onMessage } from './actions/index'
import { connect } from 'react-redux'

const history = createBrowserHistory();

const App = (props) => {
    const handleCreateRoom = useRef();

    webSocket.onopen = () => {
      console.log("connected");
    }

    webSocket.onmessage = (message) => {
      console.log(message);
      props.onMessage(message);
    }

    return (
    <div className="App">
       <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/chat" exact component={Chat} handleCreationRoom = {handleCreateRoom} />
        </Switch>
      </Router> 
    </div>
  );
}

export default connect(null, { onMessage })(App);
