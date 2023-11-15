import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';

class App extends Component {
    state = {
        deals: [],
    }
    async componentDidMount() {
        const deals = await ajax.fetchInitialDeals();
        this.setState(() => {
            return { deals };
        });
    }
  render() {
    return (
      <View style={styles.container}>
        { 
        this.state.deals.length > 0
        ? <DealList deals={this.state.deals} />
        : <Text style={styles.header}>Bake Sale</Text>
        }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 40,
    },
})
export default App;