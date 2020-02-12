import React , {Component, useEffect, useState} from 'react';
import axios from 'axios';
import './Users.css';
import '../App.css';
import {TableRow} from '../App';
const Users=(props)=>{
    // console.log('users is kos', props.users.data)
    // console.log(props)
    const [data, setData] = useState([]);
    useEffect(()=>{async function fetchdata(){
        // const res = await axios('http://jsonplaceholder.typicode.com/users');
        // setData(data);
        // console.log(data, 'gavvvvvvvvvvvvv')
        fetch('http://jsonplaceholder.typicode.com/users')
          .then(res=>res.json())
          .then((data)=>{
            setData(data);
            console.log('tokhm', data)
          })
          .catch(console.log);}fetchdata();}
          , []);

    return (
    <div className='userspart'>
          <table>
            <tbody>
              {/* {props.users.data.map((user, id)=><TableRow user={user} key={id}></TableRow>)} */}
              {/* {props} */}
              {data.map((user, id)=><TableRow user={user} key={id}></TableRow>)}
            </tbody>
          </table>
    </div>)}

export default Users;