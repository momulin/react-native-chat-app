import * as React from 'react';
import { Searchbar } from 'react-native-paper';

export default class MyComponent extends React.Component {

  render() {
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={this.props.onChangeText}
        value={this.props.value}
      />
    );
  }
}