import React, {Component} from 'react';
import './Weekly.css';

export default class Weekly extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
    }
    render(){
        return(
            <div>
                <canvas id="myChart" width="400" height="400" aria-label="Hello ARIA World"><p>Hello Fallback World</p></canvas>
            </div>
        );
    }
}