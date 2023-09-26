import Header from '../header/header';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import RandomPlanet from '../random-planet/random-planet';
import './app.css';

export function App() {
  return (
    <div>
      <Header />
      <RandomPlanet />
      <div className="m-top row mb2">
        <div className="col-md-6">
          <ItemList />
        </div>
        <div className="col-md-6">
          <PersonDetails />
        </div>
      </div>
    </div>
  );
}
