import React, { Component } from 'react';

// import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import {Bar} from 'react-chartjs-2';
import '../index.css'


class MetroChart extends Component {

    constructor(props) {
        super(props);

        this.cities = this.props.data.map(element => element.city);
        this.operational_kms = this.props.data.map(element => element.operational_kms);
        this.under_construction_kms = this.props.data.map(element => element.under_construction_kms);
        this.planned_kms = this.props.data.map(element => element.planned_kms)
    }

    render() {
        let data =  {
            labels: this.cities,
            datasets: [{
                label: "Operational",
                data: this.operational_kms,
                backgroundColor: Array(this.cities.length).fill('rgba(25, 199, 132, 0.8)'),
                borderColor: Array(this.cities.length).fill('rgba(125, 199, 132, 1)'),
                borderWidth: 2
            }, {
                label: "Under Construction",
                data: this.under_construction_kms,
                backgroundColor: Array(this.cities.length).fill('rgba(55, 239, 32, 0.6)'),
                borderColor: Array(this.cities.length).fill('rgba(55, 199, 132, 1)'),
                borderWidth: 2
            }, {
                label: "Planned",
                data: this.planned_kms,
                backgroundColor: Array(this.cities.length).fill('rgba(55, 179, 232, 0.4)'),
                borderColor: Array(this.cities.length).fill('rgba(55, 129, 182, 1)'),
                borderWidth: 2
            }]
        }
        
        let options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor : this.props.themecolor,
                        fontSize : 16,
                    },
                    scaleLabel : {
                        labelString: "System Length (km)",
                        display : true,
                        lineHeight : 2.4,
                        fontColor : this.props.themecolor,
                        fontSize : 20,
                    },
                    gridLines : {
                        zeroLineColor : this.props.themecolor,
                        zeroLineWidth : 2,
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor : this.props.themecolor,
                        fontSize : 16,
                    },
                    gridLines : {
                        zeroLineColor : this.props.themecolor,
                    },
                }]
            },
            maintainAspectRation : true,
            legend : {
                position : 'bottom',
                labels : {
                    fontSize : 18,
                    fontColor : this.props.themecolor,
                }
            },
            title : {
                position : 'top',
                text : this.props.title,
                fontSize : 20,
                display : true,
                fontColor : this.props.themecolor,
                fontFamily : 'Helvetica',
            },
        }
      
        return <div class='metro-chart'>
            <Bar data={data} options={options} />
            </div>
    }
}

export default MetroChart;