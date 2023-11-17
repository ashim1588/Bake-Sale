import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../util';
import ajax from '../ajax';

class DealDetail extends Component {
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    }
    state = {
        deal: this.props.initialDealData,
    };
  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetails(this.state.deal.key);
    this.setState({
        deal: fullDeal,
    });
    console.log(fullDeal);
  }
  render() {
    const {deal} = this.state;
    return (
        <View style={styles.deal}>
            <TouchableOpacity onPress={this.props.onBack}>
                <Text style={styles.backLink}>Back</Text>
            </TouchableOpacity>
            <Image style={styles.image} source={{uri: deal.media[0]}} />
            <View style={styles.detail}>
            <View>
            <Text style={styles.title}>{deal.title}</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.info}>
                <Text style={styles.price}>{(priceDisplay(deal.price))}</Text>
                <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
        {deal.user && (
            <View style={styles.user}>
            <Image source={{uri: deal.user.avatar}} style={styles.avatar}/>
            <Text>{deal.user.name}</Text>
        </View>
        )}
        </View>
        <View style={styles.description}>
            <Text>{deal.description}</Text>
        </View>
        </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    deal: {
        marginTop: 10
    },
    backLink: {
        marginBottom: 5,
        color: '#22f',
        marginLeft: 10,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    title: {
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    info: {
        alignItems: 'center'
    },
    user: {
        alignItems: 'center',
      },
    cause: {
        flex: 2,
      },
      price: {
        flex: 1,
        textAlign: 'right',
        marginTop: 8,
      },
    avatar: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderRadius: 30,
      },
    description: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        margin: 15,
    }
})

export default DealDetail;
