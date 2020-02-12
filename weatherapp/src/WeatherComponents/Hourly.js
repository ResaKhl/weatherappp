import React, {useState, useEffect, useRef} from 'react';
import {Chart} from 'chart.js';

function Hourly(props){
    const reftocanvas = useRef(null);
    const tabs = ['Temperature', 'Pressure', 'Humidity', 'Ozone', 'Visibility', 'Wind Speed'];
    const [currTab, setCurrTab] = useState('Temperature');
    useEffect(()=>{
        const can = reftocanvas.current;
        console.log(can)
        const ctx = can.getContext('2d');

        const data = {'Temperature':[], 
        'Pressure':[], 'Humidity':[], 
        'Ozone':[], 'Visibility':[], 
        'Wind Speed':[]};

        const labels = [];
        const bgc = [];
        const bordc = [];
        // h in props.weatherinfo.hourly.data
        // props.weatherinfo.hourly.data.temperature
        for (let i=0;i<props.weatherinfo.hourly.data.length && i<20;i++){
            data['Temperature'].push(props.weatherinfo.hourly.data[i].temperature);
            data['Pressure'].push(props.weatherinfo.hourly.data[i].pressure);
            data['Humidity'].push(props.weatherinfo.hourly.data[i].humidity);
            data['Ozone'].push(props.weatherinfo.hourly.data[i].ozone);
            data['Visibility'].push(props.weatherinfo.hourly.data[i].visibility);
            data['Wind Speed'].push(props.weatherinfo.hourly.data[i].windSpeed);
            labels.push(`${i}`);
            bgc.push('rgba(54, 162, 235, 0.2)');
            bordc.push('rgba(54, 162, 235, 1)');
        }
        const mychart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: '# of Votes',
                    data:data[currTab],
                    backgroundColor: bgc,
                    borderColor: bordc,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: '% Temperature'
                        }
                    }]
                    ,
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time Difference From Our Current Tab'
                        }
                    }]
                }
            }
        });
    });
    const onChangeHandler = event=>{
        setCurrTab(event.target.value)
    }
    const selectStyle = {display:'block', width:'10em', marginLeft:'-400px', marginTop:'20px'};
    return(
        <div>
        <div className='container'>
        <select className='state-select form-control row justify-content-start col-sm-5' style={selectStyle} onChange={onChangeHandler} value={currTab}>
            {tabs.map((tab, id)=><option value={tab} key={id}>{tab}</option>)}
          </select>
        </div>
        <canvas id="myChart" width="400" height="400" aria-label="Hello ARIA World" ref={reftocanvas}><p>Hello Fallback World</p></canvas>
        </div>
    );
}

export default Hourly