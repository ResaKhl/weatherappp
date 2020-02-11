import React , {Component} from 'react';
import './Users.css';
import '../App.css';
import {TableRow} from '../App';
const Users=(props)=>{
    return <div className='userspart'>
          <table>
            <tbody>
              {props.users.map((user, id)=><TableRow user={user} key={id}></TableRow>)}
            </tbody>
          </table>
    </div>
}
export default Users;