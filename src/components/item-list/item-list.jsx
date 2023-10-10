import { Component } from 'react';
import { Spin } from 'antd';

import './item-list.css';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleList: null,
    };
  }

  componentDidMount() {
    this.onLoadedPeople();
  }

  onLoadedPeople() {
    const { getAllPeople } = this.props;
    getAllPeople().then((peopleList) => this.setState({ peopleList }));
  }

  // eslint-disable-next-line class-methods-use-this
  renderItems(arr) {
    const { onSelectedPerson } = this.props;
    return arr.map(({ id, name }) => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <li key={id} className="list-group-item" onClick={() => onSelectedPerson(id)}>
        {name}
      </li>
    ));
  }

  render() {
    const { peopleList } = this.state;
    if (!peopleList) {
      return <Spin />;
    }
    const items = this.renderItems(peopleList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}

export default ItemList;
