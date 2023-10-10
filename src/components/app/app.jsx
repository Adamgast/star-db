import { Component } from 'react';
import { Alert } from 'antd';

import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context';
import Header from '../header/header';
import PersonPage from '../person-page/person-page';
import RandomPlanet from '../random-planet/random-planet';
import SwapiService from '../../services/swapi-service';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.swapiService = new SwapiService();
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <Alert message="Error" description="ComponentCatch Error!" type="error" showIcon />;
    }
    return (
      <div>
        <SwapiServiceProvider value={this.swapiService}>
          <Header />
          <RandomPlanet />
          <PersonPage />
        </SwapiServiceProvider>
      </div>
    );
  }
}
export default App;
