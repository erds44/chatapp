import './App.css';
import React ,{useRef} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login/login'
import Chat from './components/chat/index'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

const App = () => {
    const handleCreateRoom = useRef();
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

export default App;
