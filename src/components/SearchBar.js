import React, { Component } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import  debounce  from 'lodash.debounce';

class SearchBar extends Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
    }
    state = {
        searchTerm: '',
    }
    debouncedSearchDeals = debounce(this.props.searchDeals, 300);
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchDeals(this.state.searchTerm);
        });
    }
  render() {
    return (
      <TextInput
      style={styles.input}
      placeholder='Search All Deals...'
      onChangeText={this.handleChange}
      />
    )
  }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
        marginTop: 4,
    },
})

export default SearchBar;
