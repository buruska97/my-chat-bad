import React, {Component} from 'react';
import './App.css';
import {Login} from './Login.tsx'
import {proxy} from './Proxy.ts'
import {Main} from './Main.tsx'

export default class App extends Component
{
  state = { showLogin: true };
  render()
  {
    return (
    <div className="app">
    { this.state.showLogin ? <Login /> : <Main /> }
    </div>
    );
  }
  
  componentDidMount()
  {
    proxy.addEventListener( "login", () => this.setState( { showLogin: false } ) );
  }

}

