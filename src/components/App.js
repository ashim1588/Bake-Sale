import React, { Component } from 'react'
import { StyleSheet, Text, View, Easing,Dimensions, Animated } from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

class App extends Component {
    titleXPos = new Animated.Value(0);
    state = {
        deals: [],
        dealsFromSearch: [],
        currentDealId: null,
        activeSearchTerm: '',
    }
    animatedTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;
        Animated.timing(
            this.titleXPos,
            {toValue: direction * (width/2), 
             duration: 1000,
             easing: Easing.ease,
            }
        ).start(({ finished }) => {
            if(finished){
                {this.animatedTitle(-1 * direction)};ß
            }
        });
    }
    async componentDidMount() {
        this.animatedTitle();
        const deals = await ajax.fetchInitialDeals();
        this.setState({ deals });
    }
  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if(searchTerm) {
        dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm);
    }
    this.setState({ dealsFromSearch, activeSearchTerm: searchTerm })
  }
  setCurrentDeal = (dealId) => {
    this.setState({
        currentDealId: dealId
    });
  }
  unSetCurrentDeal = () => {
    this.setState({
        currentDealId: null,
    });
  }
  currentDeal = () => {
    return this.state.deals.find(
        (deal) => deal.key === this.state.currentDealId
    )
  }
  render() {
    if(this.state.currentDealId){
        return (
            <View style={styles.main}>
            <DealDetail initialDealData={this.currentDeal()}
                onBack={this.unSetCurrentDeal}
        />
        </View>
        )
    }
    const dealsToDisplay = this.state.dealsFromSearch.length > 0 ? this.state.dealsFromSearch : this.state.deals
    if(this.state.deals.length > 0){
        return (
            <View style={styles.main}>
                <SearchBar searchDeals = {this.searchDeals}
                initialSearchTerm = {this.state.activeSearchTerm}
                />
                <DealList deals={dealsToDisplay}  onItemPress={this.setCurrentDeal}/>
            </View>
        );
    }
    return (
      <Animated.View style={[{left: this.titleXPos}, styles.container]}>
         <Text style={styles.header}>Bake Sale</Text>
        </Animated.View>
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
    main: {
        marginTop: 40,
    }
})
export default App;