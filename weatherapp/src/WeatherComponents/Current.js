import React , {Component} from 'react';
import './Current.css';
export default class Current extends Component {
    constructor(props){
        super(props);
        this.state = {
            city:'',
            state:''
        }
    }
    componentDidMount(){
        const [lat, long] = [this.props.weatherinfo.latitude, this.props.weatherinfo.longitude];
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=9c325aa45a2c4f81a72b27674accf9c7`
        fetch(url)
            .then(res=>res.json())
            .then(data=>{
                console.log(data.results[0].components.city, data.results[0].components.state)
                console.log('kollllssssssssssssssss')
                this.setState({city: data.results[0].components.city,
                     state: data.results[0].components.state})
            })
    }
    render(){
        return (
        <div className='current-degree current' style={{borderRadius:'1em'}}>
            <p className='current-parts'>{this.state.city}</p>
            <p className='current-parts'>{this.props.weatherinfo.timezone}</p>
            <p className='current-parts'>{this.props.weatherinfo.currently.apparentTemperature}&#176;F</p>
            <p className='current-parts'>{this.props.weatherinfo.currently.summary}</p>
            <div class="flex-container">
            <div><img className='current-icons' src="https://cdn2.iconfinder.com/data/icons/weather-
74/24/weather-16-512.png" alt="new"/></div>
            <div><img className='current-icons' src="https://cdn2.iconfinder.com/data/icons/weather-
74/24/weather-25-512.png" alt="new"/></div>
            <div><img className='current-icons' src="https://cdn2.iconfinder.com/data/icons/weather-
74/24/weather-27-512.png" alt="new"/></div>
            <div><img className='current-icons' src="https://cdn2.iconfinder.com/data/icons/weather-
74/24/weather-30-512.png" alt="new"/></div>
            <div><img className='current-icons' src="https://cdn2.iconfinder.com/data/icons/weather-
74/24/weather-28-512.png" alt="new"/></div>
            <div><img className='current-icons' src="https://cdn2.iconfinder.com/data/icons/weather-
74/24/weather-24-512.png" alt="new"/></div>
            </div>
            <div class="flex-container">
            <div>{this.props.weatherinfo.currently.humidity}</div>
            <div>{this.props.weatherinfo.currently.pressure}</div>
            <div>{this.props.weatherinfo.currently.windSpeed}</div>
            <div>{this.props.weatherinfo.currently.visibility}</div>
            <div>{this.props.weatherinfo.currently.cloudCover}</div>
            <div>{this.props.weatherinfo.currently.ozone}</div>
            </div>
        </div>
        );
    }
  }