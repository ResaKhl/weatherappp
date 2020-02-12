import React, {useState, useEffect, useRef} from 'react';
import {Chart} from 'chart.js';

function Hourly(props){
    const reftocanvas = useRef(null);
    const tabs = ['Temperature', 'Pressure', 'Humidity', 'Ozone', 'Visibility', 'Wind Speed'];
    let currTab = 'Temperature';
    useEffect(()=>{
        const can = reftocanvas.current;
        console.log(can)
        const ctx = can.getContext('2d');
        const data = [];
        const labels = [];
        const bgc = [];
        const bordc = [];
        // h in props.weatherinfo.hourly.data
        // props.weatherinfo.hourly.data.temperature
        for (let i=0;i<props.weatherinfo.hourly.data.length && i<20;i++){
            data.push(props.weatherinfo.hourly.data[i].temperature);
            labels.push(`${i}`);
            bgc.push('rgba(54, 162, 235, 0.2)');
            bordc.push('rgba(54, 162, 235, 1)');
        }
        console.log(data, '****koss')
        console.log(props.weatherinfo.hourly.data)
        const mychart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: '# of Votes',
                    data,
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
    return(
        <div>
        
        <canvas id="myChart" width="400" height="400" aria-label="Hello ARIA World" ref={reftocanvas}><p>Hello Fallback World</p></canvas>
        </div>
    );
}

export default Hourly