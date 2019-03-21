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
                <Header as='h1' textAlign='center' size='huge'>Metro Systems In India</Header>
            </div>
            <MetroChart data={MetroData} title='Tier I Cities'/>
            <MetroChart data={MetroCitiesData} title='Tier II Cities'/>
        </Container>
    }
}

export default App;
