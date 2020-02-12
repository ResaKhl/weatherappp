import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './App';
import MyComponent from "./WeatherComponents/Posts";
import Post from "./WeatherComponents/singlepost";
import Users from "./WeatherComponents/Users";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default function App() {
  // const [data, setData] = useState([]);
  // async function fetchData() {
  //   const res = await fetch("'http://jsonplaceholder.typicode.com/users");
  //   res
  //     .json()
  //     .then(res => setPlanets(res))
  //     .catch(err => setErrors(err));
  // }
  // useEffect(async ()=>{
  //   const res = await axios('http://jsonplaceholder.typicode.com/users');
  //   setData(data);
  //   console.log(data, 'gavvvvvvvvvvvvv')
  //   // fetch('http://jsonplaceholder.typicode.com/users')
  //   //   .then(res=>res.json())
  //   //   .then((data)=>{
  //   //     this.setState({users:data});
  //   //     console.log('tokhm', data)
  //   //   })
  //   //   .catch(console.log);
  // }, []);
  // console.log(data, 'loooooooooooooooooo');
    return (
      <Router>
        <div>
          <nav>
            <table>
              <td>
                <Link exact to="/">Home</Link>
              </td>
              <td>
                <Link to="/about">About</Link>
              </td>
              <td>
                <Link to="/users">Users</Link>
              </td>
              <td>
                <Link to="/posts">Posts</Link>
              </td>
            </table>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/post/:postid">
              <Post />
            </Route>
            <Route path="/posts">
              <MyComponent />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
  function About() {
    return <h2>About</h2>;
  }

  function Posts() {
    return <h2>Posts</h2>;
  }

  
