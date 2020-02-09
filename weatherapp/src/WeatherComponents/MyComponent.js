import React, { Component } from 'react';
import { TableRow } from './Posts';
export class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            posts: null,
        };
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts => { this.setState({ isLoaded: true, posts }); });
    }
    showPost() {
    }
    render() {
        const { posts, isLoaded } = this.state;
        console.log('**********');
        console.log(posts);
        console.log('**********');
        const tablestyle = {
            border: '1px solid black',
        };
        // return <div></div>;
        return !isLoaded ? (<h6>IS LOADING...</h6>) :
            (<div>
                <table style={tablestyle}>
                    <tr><th><td>index</td><td id='posttile'>title</td><td id='postbody'>body</td></th></tr>
                    <tr>
                        {posts.map((post, i) => <TableRow key={i} post={post}></TableRow>)}
                    </tr>
                </table>
            </div>);
    }
}
