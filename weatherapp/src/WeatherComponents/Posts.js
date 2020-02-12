import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './../App.css';

class Posts extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded:false,
            posts: null,
        };
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res=>res.json())
            .then(posts=>{this.setState({isLoaded:true,posts})});
    }
    render(){
        const {posts, isLoaded} = this.state;
        console.log('**********');
        console.log(posts)
        console.log('**********');
        const tablestyle = {
            border:'1px solid black',
        };
        // return <div></div>;
        return !isLoaded ? (<h6>kir IS LOADING...</h6>):
         (
            <div>
                <table style={tablestyle}>
                    <tbody>
                    <tr><th><td>index</td><td id='posttile'>title</td><td id='postbody'>body</td></th></tr>
                    <tr>
                        {posts.map((post, i)=><TableRow key={i} post={post}></TableRow>)}
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const TableRow = (props)=> {
    return <tr>
      <td><Link to='/post' onClick={props.showPost}>{props.post.id}</Link></td>
      <td>{props.post.title}</td>
      <td>{props.post.body}</td>
    </tr>;
  }

export default Posts;