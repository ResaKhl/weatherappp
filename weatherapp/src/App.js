import React , {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactDom from 'react-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from "./WeatherComponents/Posts";
import { Button } from 'react-bootstrap';
import Current from './WeatherComponents/Current';

export class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      street:'Shoup Ave',
      city:'Los Angeles',
      lat:'',
      long:'',
      states:['Select','Alabama','Alaska','American Samoa','Arizona','Arkansas',
      'California','Colorado','Connecticut','Delaware','District of Columbia',
      'Federated States of Micronesia','Florida','Georgia','Guam','Hawaii',
      'Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine',
      'Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota',
      'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
      'New Jersey','New Mexico','New York','North Carolina','North Dakota',
      'Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania',
      'Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas',
      'Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin',
      'Wyoming'],
      currState : 'Select',
      currLoc: false,
      users:[],
      loadingcustomers: true,
      customers : [],
      fetchedweather : false,
      weatherstates : {},
    }
    this.updateStreet = this.updateStreet.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateStates = this.updateStates.bind(this);
    this.updateCurrloc = this.updateCurrloc.bind(this);
    this.updateClear = this.updateClear.bind(this);
    this.submitform = this.submitform.bind(this);
    this.updatelatlong = this.updatelatlong.bind(this);
    this.submitPostlatlong = this.submitPostlatlong.bind(this);
  }

  updateStreet(e){
    e.preventDefault();
    this.setState({street:e.target.value});
  }
  updateCity(e){
    e.preventDefault();
    this.setState({city:e.target.value});
  }
  updateStates(e){
    e.preventDefault();
    this.setState({currState:e.target.value});
  }
  updateCurrloc(e){
    e.preventDefault();
    this.setState({currLoc:!this.state.currLoc});
  }
  updateClear(e){
    e.preventDefault();
    this.setState({
      street:'Shoup Ave',
      city:'Los Angeles',
      currState : 'Select',
      currLoc: false,
  })
  }
  updatelatlong(e){
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState ({
      [name] : value,
    })
  }
  componentDidMount(){
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(res=>res.json())
      .then((data)=>{
        this.setState({users:data})
      })
      .catch(console.log)
  }
  submitform(e){
    e.preventDefault();
    fetch('http://localhost:5000/api/customers')
      .then(res=>res.json())
      .then((data)=>{
        this.setState({
          customers:data, 
          loadingcustomers:false
        })
        console.log(data);
      })
  }
  submitPostlatlong(e){
    e.preventDefault();
    const uri = `http://localhost:5000/weather/lat/${this.state.lat}/long/${this.state.long}`
    fetch(uri).then(res=>res.json())
      .then((data)=>
      { this.setState({
        fetchedweather : true,
        weatherstates:data});
        console.log(data);
      }
    )
  }
  
  render(){
    let testStyle = {
      'marginTop':'50px',
    }
    const rendercustomer = this.state.loadingcustomers;
    const weatherstates = this.state.weatherstates;
    return (
      <div className="App">
        <form className='weatherform'>
          <h1>Weather Search</h1>

          <div id='street' className='inputpart input-group mb-3'>
          <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">street</span>
          </div>
          <input className='form-control inputform col-sm-3' onChange={this.updateStreet} value={this.state.street}></input>
          </div>
          <div id='city' className='inputpart input-group mb-3'>
          <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">city</span>
          </div>
          <input className='form-control inputform col-sm-3' onChange={this.updateCity} value={this.state.city}></input>
          </div>
          <div className='inputpart' style={{marginLeft:'-22em'}}>
          <label className='inputlabel form-group' style={{display:'inline'}}>state</label>
          <select className='state-select form-control col-sm-3' style={{display:'inline', width:'10em'}} onChange={this.updateStates} value={this.state.currState}>
            {this.state.states.map((st, id)=><option value={st} key={id}>{st}</option>)}
          </select>
          </div>

          <div className='inputpart form-check' style={{marginLeft:'-25em'}}>
          <label className='current-Location form-check-label'>
          <input name='currentLocation' className='form-check-input' type='checkbox' onChange={this.state.updateCurrloc} 
          value={this.state.currLoc}>
          </input>
          current-Location
          </label>
          </div>

          <div className='inputpart input-group mb-3'>
          <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">lat</span>
          </div>
          <input className='form-control inputform col-sm-3' onChange={this.updatelatlong} value={this.state.lat} name='lat'></input>
          </div><div className='inputpart input-group mb-3'>
          <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">long</span>
          </div>
          <input className='form-control inputform col-sm-3' onChange={this.updatelatlong} value={this.state.long} name='long'></input>
          </div>
          <div class="container">
          <input type='submit' className='submitbutton btn btn-success btn-sm col-sm-3' value='Submitlatlong' onClick={this.submitPostlatlong} />
          <input type='submit' className='submitbutton btn btn-success btn-sm col-sm-3' id='submit' value='Submit' onClick={this.submitform} />
          <input type='submit' className='submitbutton btn btn-success btn-sm col-sm-3' id ='clear' value='clear' onClick={this.updateClear}/>
          </div>
        </form>
        <div className='userspart'>
          <table>
            <tbody>
              {this.state.users.map((user, id)=><TableRow user={user} key={id}></TableRow>)}
            </tbody>
          </table>
        </div>
        <div className='userspart' id='customers'>
        {rendercustomer ? <h3>is loading...</h3>:
        <table>
        <tbody>
          {this.state.customers.map((cust, id)=><CustBlock user={cust}></CustBlock>)}
        </tbody>
        </table> 
        }
        </div>
        <div className='userspart' id='customers'>
        {!this.state.fetchedweather ? <h3>is loading weather status...</h3> :
        <table>
        <tbody>
          {/* {this.state.weatherstates.map((cust, id)=><CustBlock user={cust}></CustBlock>)} */}
          <tr><td>{weatherstates.currently.apparentTemperature}</td></tr>
        </tbody>
        </table> 
        }
        </div>
        <div>
          <h1 style={testStyle}>Test</h1>
          <h5>street value is:</h5>{this.state.street}
          <h5>city value is:</h5>{this.state.city}
          <h5>currState value is:</h5>{this.state.currState}
        </div>
        {!this.state.fetchedweather ? <h3>is loading weather status...</h3> :
        <div>
          <Router>
            <div>
              <ul class="nav nav-tabs sectionnav" style={{ listStyleType: 'None'}}>
                  <li className='sectionnav nav-item'>
                    <Link to="/current" className='nav-link'>Current</Link>
                  </li>
                  <li className='sectionnav nav-item'>
                    <Link to="/hourly" className='nav-link'>Hourly</Link>
                  </li>
                  <li className='sectionnav nav-item'>
                    <Link to="/weekly" className='nav-link'>Weekly</Link>
                  </li>
              </ul>
      
              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
              <div className='retrieved-data'>
              <Switch>
                <Route path="/Current">
                  <Current weatherinfo={weatherstates}/>
                </Route>
                <Route path="/Hourly">
                  <Hourly weatherinfo={weatherstates}/>
                </Route>
                <Route path="/Weekly">
                  <Weekly weatherinfo={weatherstates}/>
                </Route>
              </Switch>
              </div>
            </div>
        </Router>
      </div>
      }
      </div>
    );
  }
}

function Hourly(props) {
  return <h2>Hourly</h2>;
}

function Weekly(props) {
  return <h2>Weekly</h2>;
}



const TableRow = (props)=> {
  return <tr>
    <td>{props.user.id}</td>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    <td>`{props.user.address.street} {props.user.address.suit} {props.user.address.city} {props.user.address.zipcode}` </td>
  </tr>;
}

const CustBlock = (props) => {
  return <tr>
    <td>{props.user.id}</td>
    <td>{props.user.firstName}</td>
    <td>{props.user.lastName}</td>
  </tr>;
}

export default Home;