import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Header, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import MetroChart from './containers/metrochart.js'

class App extends Component {
    render() {
        return <Container fluid>
            <div class='page-title'>
                <Header as='h1' textAlign='center' size='huge'>Metro Systems In India</Header>
            </div>
            <MetroChart />
        </Container>
    }
}

export default App;
