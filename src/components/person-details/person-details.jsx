/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Alert, Spin } from 'antd';

import SwapiService from '../../services/swapi-service';
import './person-details.css';

export default class PersonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: null,
      loading: false,
      error: false,
    };
    this.swapiService = new SwapiService();
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps, prevState) {
    const { personId } = this.props;
    if (prevProps.personId !== personId) {
      if (prevState.loading === false) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ loading: true });
      }
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }
    this.swapiService
      .getPerson(personId)
      .then((person) => this.setState({ person, loading: false }))
      .catch(() => this.setState({ error: true, loading: false }));
  }

  render() {
    const { person, loading, error } = this.state;

    if (!person && !loading) {
      return <span>Select a person from list!</span>;
    }
    const spinner = loading ? <Spin /> : null;
    const errorMessage = error ? (
      <Alert message="Error" description="We could not find the resource you requested." type="error" showIcon />
    ) : null;
    const content = !(loading || error) ? <PersonDetailsView person={person} /> : null;

    return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    );
  }
}

function PersonDetailsView({ person }) {
  const { id, name, gender, eyeColor, birthYear } = person;
  return (
    <div className="person-details card">
      <img
        className="person-image"
        alt="img"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
