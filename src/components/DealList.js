import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

class DealList extends Component {
    static propTypes = { 
        deals: PropTypes.array.isRequired,
    }
  render() {
    return (
      <View style={styles.list}>
        <Text>Deals.... </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        paddingTop: 50,
        
    },
})

export default DealList;
