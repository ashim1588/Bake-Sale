import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, PanResponder, Animated, View, Dimensions, Button, Linking, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../util';
import ajax from '../ajax';

class DealDetail extends Component {
    imageXPos = new Animated.Value(0);
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            this.imageXPos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            this.width = Dimensions.get('window').width;
            if(Math.abs(gs.dx) > this.width * 0.4){
                const direction = Math.sign(gs.dx);
                //-1 for Swipe Left, 1 for swipe right
                Animated.timing(this.imageXPos, {
                    toValue: direction * this.width,
                    duration: 250,
                }).start(() => this.handleSwipe(-1 * direction));
            } else {
                Animated.spring(this.imageXPos, {
                    toValue: 0,
                }).start()
            }
        }
    });

    handleSwipe = (indexDirection) => {
        if(!this.state.deal.media[this.state.imageIndex + indexDirection]){
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start()
            return;
        }
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            //Next image animation
            this.imageXPos.setValue(indexDirection * this.width);
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start()
        });
    }
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    }
    state = {
        deal: this.props.initialDealData,
        imageIndex: 0,
    };
  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetails(this.state.deal.key);
    this.setState({
        deal: fullDeal,
    });
    console.log(fullDeal);
  }
  openDealUrl = () => {
    Linking.openURL(`https://www.linkedin.com/in/ashimmehar/`);
  }
  render() {
    const {deal} = this.state;
    return (
        <View style={styles.deal}>
            <TouchableOpacity onPress={this.props.onBack}>
                <Text style={styles.backLink}>Back</Text>
            </TouchableOpacity>
            <Animated.Image 
            {...this.imagePanResponder.panHandlers}
            style={[{left: this.imageXPos}, styles.image]} 
            source={{uri: deal.media[this.state.imageIndex]}} 
            />
            <View>
            <Text style={styles.title}>{deal.title}</Text>
            </View>
            <ScrollView style={styles.detail}>
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
        <Button title='Buy this deal!' onPress={this.openDealUrl}/>
        </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    deal: {
        marginTop: 10,
        marginBottom: 20
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
    },
    detail: {
        
    }
})

export default DealDetail;
