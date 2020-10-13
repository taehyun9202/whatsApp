import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Siderbar from './components/Siderbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';

function App() {
  const [{ user }, dispathch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
      <div className="app__Body">
        <Router>
          <Siderbar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>

            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
