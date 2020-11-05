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
    const {dispatch, message} = props;

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
          <Route path="/chat" exact component={Chat}/>
        </Switch>
      </Router> 
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
    return { message: state.message }
};

export default connect(mapStateToProps, { onMessage })(App);
