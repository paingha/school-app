import React from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, Platform, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import * as RNIap from 'react-native-iap';
import Icon from 'react-native-vector-icons/FontAwesome';
const { height } = Dimensions.get('window');

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
        productList: [],
        screenHeight: height,
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
      const scrollEnabled = this.state.screenHeight > height - 30;
        return(
          <ScrollView 
                style={{flex:1}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
            
              <TouchableNativeFeedback
              onPress={this.buyOneCoin  
              }
            useForeground={true}
            background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{borderBottomWidth: 4, borderBottomColor:'#085078', alignItems:'center', marginHorizontal:10, marginVertical: 10, backgroundColor:'white', height:200, elevation:2, width:'80%'}}>
                    <Text style={{marginTop:40}}>One Coin</Text>
                    <Text style={{fontSize:35, color:'black', fontWeight:'bold', marginTop:10}}>$1.99</Text>
                    <TouchableOpacity onPress={this.buyOneCoin} style={{height: 35, marginTop:15, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'center', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
                    <Icon name="shopping-cart" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", marginHorizontal:10}}>Buy Coin</Text>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={this.buyTwoCoin  
              }
            useForeground={true}
            background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{borderBottomWidth: 4, borderBottomColor:'#085078', alignItems:'center', marginHorizontal:10, marginVertical: 10, backgroundColor:'white', height:200, elevation:2, width:'80%'}}>
                    <Text style={{marginTop:40}}>Two Coin</Text>
                    <Text style={{fontSize:35, color:'black', fontWeight:'bold', marginTop:10}}>$2.99</Text>
                    <TouchableOpacity onPress={this.buyTwoCoin} style={{height: 35, marginTop:15, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'center', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
                    <Icon name="shopping-cart" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", marginHorizontal:10}}>Buy Coin</Text>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>
            

            <TouchableNativeFeedback
              onPress={this.buyThreeCoin  
              }
            useForeground={true}
            background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{borderBottomWidth: 4, borderBottomColor:'#085078', alignItems:'center', marginHorizontal:10, marginVertical: 10, backgroundColor:'white', height:200, elevation:2, width:'80%'}}>
                    <Text style={{marginTop:40}}>Three Coin</Text>
                    <Text style={{fontSize:35, color:'black', fontWeight:'bold', marginTop:10}}>$3.99</Text>
                    <TouchableOpacity onPress={this.buyThreeCoin} style={{height: 35, marginTop:15, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'center', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
                    <Icon name="shopping-cart" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", marginHorizontal:10}}>Buy Coin</Text>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>
            </View>
            </ScrollView>
        )
    }
}