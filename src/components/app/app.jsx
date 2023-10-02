import { Component } from 'react';

import Header from '../header/header';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import RandomPlanet from '../random-planet/random-planet';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: null,
    };
  }

  onSelectedPerson = (personId) => {
    this.setState({ personId });
  };

  render() {
    const { personId } = this.state;
    return (
      <div>
        <Header />
        <RandomPlanet />
        <div className="m-top row mb2">
          <div className="col-md-6">
            <ItemList onSelectedPerson={this.onSelectedPerson} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={personId} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
