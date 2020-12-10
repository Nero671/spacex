import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Hedaer from './Components/Header/Header';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Features from './Components/Features/Features';
import Footer from './Components/Footer/Footer';
import Calendar from './Components/Calendar/Calendar';
import Details from './Components/Details/Details';
import FetchData from './service/FetchData';

import './style.css';

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null, 
    rockets: [],
    company: null,
  }

  componentDidMount() {
    this.updateRocket();
    this.updateCompany();
  }

  updateRocket() {
    this.fetchData.getRocket()
        .then(data => {
          this.setState({ rockets: data.map(item => item.name) })
          return data
        })
        .then(data => data.find(item => item.name === this.state.rocket))
        .then(rocketFeatures => this.setState({ rocketFeatures }));
  }

  changeRocket = rocket => {
    this.setState({
      rocket
    }, this.updateRocket);
  }

  updateCompany = () => {
    this.fetchData.getCompany()
        .then(company => this.setState({ company }))
  }

  render() {
    return (
      <BrowserRouter>
        <Hedaer rockets={this.state.rockets} changeRocket={this.changeRocket}/>

        <Route exact path='/'>
          {this.state.company && <Home company={this.state.company}/>}
        </Route>

        <Route path='/rocket'>
          <Main rocket={this.state.rocket}/> 
          {this.state.rocketFeatures && <Features {...this.state.rocketFeatures}/>}
        </Route>

        <Route path='/calendar' component={Calendar}></Route>

        <Route path='/details/:id' component={Details}></Route>

        {this.state.company && <Footer {...this.state.company.links}/>}
      </BrowserRouter>
    );
  }
}

export default App;
