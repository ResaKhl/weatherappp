import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './../App.css';

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded:false,
            post: null,
        };
    }
    componentDidMount(){
        const {postid} = this.props.postid;
        fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`)
            .then(res=>res.json())
            .then(posts=>{this.setState({isLoaded:true,posts})});
    }
    render(){
        const {post, isLoaded} = this.state;
        const tablestyle = {
            border:'1px solid black',
        };
        // return <div></div>;
        return !isLoaded ? (<h6>IS LOADING...</h6>):
         (
            <div>
                <table style={tablestyle}>
                    <tr><th><td>index</td><td id='posttile'>title</td><td id='postbody'>body</td></th></tr>
                    <tr>
                        <TableRow post={post}></TableRow>
                    </tr>
                </table>
            </div>
        );
    }
}

const TableRow = (props)=> {
    return <tr>
      <td><Link to='/posts'>{props.post.id}</Link></td>
      <td>{props.post.title}</td>
      <td>{props.post.body}</td>
    </tr>;
  }

export default Post;