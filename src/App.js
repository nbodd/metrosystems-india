import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Header, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import MetroChart from './containers/metrochart.js'

import MetroData from './data/metro.json'
import MetroCitiesData from './data/metro-cities.json'

class App extends Component {
    render() {
        return <Container fluid>
            <div class='page-title'>
                <Header as='h1' textAlign='center' color='teal' size='huge'>Metro Systems In India</Header>
            </div>
            <MetroChart data={MetroData} themecolor='rgba(30,128,128, 1)' title='Tier I Cities'/>
            <MetroChart data={MetroCitiesData} themecolor='rgba(128, 98, 98, 1)' title='Tier II Cities'/>
            <div class='page-footer'>
                <Header textAlign='center' color='brown' size='tiny'>Data collected from Wikipedia, Last Updated on Feb 8, 2020</Header>
            </div>
        </Container>
    }
}

export default App;
