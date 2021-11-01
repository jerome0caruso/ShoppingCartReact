import React, { Component } from 'react';
import NavBar from './components/NavBar';
import { Route, BrowserRouter } from 'react-router-dom';
import Register from './views/Register';
import {Login} from './views/Login';
import { Home } from './Home';
import User from './views/Users';
import MyPage from './views/MyPage'
import MyCart from './views/MyCart';
let qT = {}

export default class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        loggedIn: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        qty: {},
        username: ''
      }
  }

  logIn = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    this.setState({
      username: username
    })
    let encodedString = btoa(`${username}:${password}`)
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Basic ${encodedString}`)
    
    fetch('https://kekambas-bs.herokuapp.com/api/token', {
        method: 'POST',
        headers: myHeaders,
    }).then(res => res.json())
      .then(data => {
        localStorage.setItem('token', data['token']);
        localStorage.setItem('userId', data['user_id']);
        this.setState({
          loggedIn: data['token'],
          userId: data['user_id']
        })
          }).catch(err => console.log(err))
}

logOut = () => {
  localStorage.removeItem('token');
  this.setState({
    loggedIn: null
  })
}

handleMyCart = (e, id) => {
  e.preventDefault();
  qT[id] = (qT[id] || 0) + 1;
  this.setState({
    qty: 1
  })
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${this.state.loggedIn}`);
  fetch(`https://kekambas-bs.herokuapp.com/api/add-to-cart/${id}`, {
        method: 'POST',
        headers: myHeaders,
    }).then(res => res.json())
      .then(data => {
          alert("Item has been added!")
          }).catch(err => console.log(err))
}

render(){
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar loggedIn={this.state.loggedIn} logOut={this.logOut}/>
          <Route exact path='/'>
            <Home handleMyCart={this.handleMyCart}/>
          </Route>
          <Route exact path='/register'>
            <Register/>
          </Route>
          <Route exact path="/login">
              <Login handleSubmit={this.logIn} loggedIn={this.state.loggedIn}/>
          </Route>
          <Route exact path="/users">
              <User />
          </Route>
          <Route exact path="/myCart">
              <MyCart token={this.state.loggedIn} qty={qT} username={this.state.username}/>
          </Route>
          <Route exact path="/myPage">
              <MyPage token={this.state.loggedIn} username={this.state.username} logout={this.logOut}/>
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

