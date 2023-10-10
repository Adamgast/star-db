import { Component } from 'react';
import { Alert } from 'antd';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';

export default class PersonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: null,
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  onSelectedPerson = (personId) => {
    this.setState({ personId });
  };

  render() {
    const { personId, hasError } = this.state;
    if (hasError) {
      return <Alert message="Error" description="ComponentCatch Error!" type="error" showIcon />;
    }
    return (
      <div className="m-top row mb2">
        <div className="col-md-6">
          <ItemList onSelectedPerson={this.onSelectedPerson} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={personId} />
        </div>
      </div>
    );
  }
}
