import React from 'react'
import {View, Image, Alert, Platform} from 'react-native'
import * as RNIap from 'react-native-iap';
import Icon from 'react-native-vector-icons/FontAwesome';

const itemSkus = Platform.select({
    ios: [
      'com.example.coins100'
    ],
    android: [
      'com.Theacademist.Theacademist'
    ]
  });


export default class BuyCoinScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
        products: [],
        productList: []
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: 'Buy Coin',
    headerStyle: {
      backgroundColor: '#085078',
      textAlign: 'center',
    },
    headerLeft: (
      <Icon
        name="bars"
        size={30}
        onPress={()=> {
          let e = navigation;
          //onSignOut(e)
          navigation.openDrawer();
          //navigation.navigate('Drawer')
        }}        
        style={{
          marginLeft: 15, 
          paddingRight: 15,
          color:'#ffffff'
        }}
        />),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
  }
  };

    buyOneCoin(){
        RNIap.buyProduct('one.coin.bundle').then(purchase => {
            this.setState({
              receipt: purchase.transactionReceipt, // save the receipt if you need it, whether locally, or to your server.
              progressTitle: 'Purchase Successful!',
              coins: this.state.coins + 100
            });
          }).catch(err => {
            // resetting UI
            console.warn(err); // standardized err.code and err.message available
            this.setState({ progressTitle: 'Buy 100 Coins for only $0.99' });
            alert(err.message);
          })
    }
    buyTwoCoin(){
        RNIap.buyProduct('two.coin.bundle').then(purchase => {
            this.setState({
              receipt: purchase.transactionReceipt, // save the receipt if you need it, whether locally, or to your server.
              progressTitle: 'Purchase Successful!',
              coins: this.state.coins + 100
            });
          }).catch(err => {
            // resetting UI
            console.warn(err); // standardized err.code and err.message available
            this.setState({ progressTitle: 'Buy 100 Coins for only $0.99' });
            alert(err.message);
          })
    }
    buyThreeCoin(){
        RNIap.buyProduct('three.coin.bundle').then(purchase => {
            this.setState({
              receipt: purchase.transactionReceipt, // save the receipt if you need it, whether locally, or to your server.
              progressTitle: 'Purchase Successful!',
              coins: this.state.coins + 100
            });
          }).catch(err => {
            // resetting UI
            console.warn(err); // standardized err.code and err.message available
            this.setState({ progressTitle: 'Buy 100 Coins for only $0.99' });
            alert(err.message);
          })
    }
    buyFourCoin(){
        RNIap.buyProduct('four.coin.bundle').then(purchase => {
            this.setState({
              receipt: purchase.transactionReceipt, // save the receipt if you need it, whether locally, or to your server.
              progressTitle: 'Purchase Successful!',
              coins: this.state.coins + 100
            });
          }).catch(err => {
            // resetting UI
            console.warn(err); // standardized err.code and err.message available
            this.setState({ progressTitle: 'Buy 100 Coins for only $0.99' });
            alert(err.message);
          })
    }
    async componentDidMount() {
        try {
          await RNIap.initConnection();
          const products = await RNIap.getProducts(itemSkus);
          this.setState({ products },()=>{
              //alert(products.toString())
          });
        } catch(err) {
          console.warn(err); // standardized err.code and err.message available
        }
      }

    componentWillUnmount() {
        RNIap.endConnection();
      }
    render(){
        return(
            <View>
                {this.state.products ?
                this.state.products.map((product)=>{
                  <Text>{JSON.stringify(product)}</Text>
                })
              :null  
              }
            </View>
        )
    }
}