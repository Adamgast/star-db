/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { Spin, Alert } from 'antd';

import SwapiService from '../../services/swapi-service';
import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  constructor() {
    super();
    this.state = {
      planet: {},
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleError = () => {
    this.setState({ error: true, loading: false });
  };

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 20) + 2;
    this.swapiService.getPlanet(id).then(this.onPlanetLoaded).catch(this.handleError);
  };

  render() {
    const { planet, loading, error } = this.state;

    const spinner = loading ? <Spin size="large" /> : null;
    const errorMessage = error ? (
      <Alert message="Error" description="We could not find the resource you requested." type="error" showIcon />
    ) : null;
    const content = !(error || loading) ? <RandomPlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

function RandomPlanetView({ planet }) {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <>
      <img className="planet-image" alt="img" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
}
