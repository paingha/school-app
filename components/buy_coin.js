import React from 'react'
import { Alert, StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, Platform, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import * as RNIap from 'react-native-iap';
import {connect} from 'react-redux';
import {verify_android} from '../settings';
import {verifyAndroidCall} from '../calls/misc'
import Icon from 'react-native-vector-icons/FontAwesome';
const { height } = Dimensions.get('window');

const itemSkus = Platform.select({
    ios: [
      'com.example.coins100'
    ],
    android: [
      'com.theacademist_app'
    ]
  });


class BuyCoinScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
        products: [],
        receipt:'',
        progressTitle:'',
        coins:0,
        productList: [],
        screenHeight: height,
        token:''
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
          navigation.openDrawer();
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
    verifyAndroid = (coin, receipt, packageName, product, e) =>{
      const {id, firstName, lastName, major, image, referralCode, referralToken, scholarshipCountry, gpa, applicantCountry, savedID, saved, criteria, level} = this.props.currentUser;
      this.props.verifyAndroid(verify_android, this.state.token, coin, receipt, packageName, product, id, this.props.navigation, e)
    }
    buyOneCoin = async() => {
      const productFour = await RNIap.buyProduct('theacademist.one.coin')
      await this.setState({receipt: productFour.purchaseToken})
      await this.verifyAndroid(1, this.state.receipt, itemSkus, 'theacademist.one.coin', RNIap.consumePurchase(this.state.receipt))
      await Alert.alert(
        'Success!',
        `${coin} coins successfully added to your wallet`,
        [
               {text: 'Close', onPress: () => console.log('OK Pressed')},
               {text: 'Find Scholarships', onPress: () => {this.props.navigation.navigate('ThirdView')}},
        ]
    )
  }
    buyTwoCoin = async() => {
      const productFour = await RNIap.buyProduct('theacademist.two.coin')
      await this.setState({receipt: productFour.purchaseToken})
      await this.verifyAndroid(2, this.state.receipt, itemSkus, 'theacademist.two.coin', RNIap.consumePurchase(this.state.receipt))
      await Alert.alert(
        'Success!',
        `${coin} coins successfully added to your wallet`,
        [
               {text: 'Close', onPress: () => console.log('OK Pressed')},
               {text: 'Find Scholarships', onPress: () => {this.props.navigation.navigate('ThirdView')}},
        ]
    )
  }
    buyThreeCoin = async() => {
      const productFour = await RNIap.buyProduct('theacademist.three.coin')
      await this.setState({receipt: productFour.purchaseToken})
      await this.verifyAndroid(3, this.state.receipt, itemSkus, 'theacademist.three.coin', RNIap.consumePurchase(this.state.receipt))
      await Alert.alert(
        'Success!',
        `${coin} coins successfully added to your wallet`,
        [
               {text: 'Close', onPress: () => console.log('OK Pressed')},
               {text: 'Find Scholarships', onPress: () => {this.props.navigation.navigate('ThirdView')}},
        ]
    )
  }
    buyFourCoin = async() => {
        const productFour = await RNIap.buyProduct('theacademist.four.coin')
        await this.setState({receipt: productFour.purchaseToken})
        await this.verifyAndroid(4, this.state.receipt, itemSkus, 'theacademist.four.coin', RNIap.consumePurchase(this.state.receipt))
        await Alert.alert(
          'Success!',
          `${coin} coins successfully added to your wallet`,
          [
                 {text: 'Close', onPress: () => console.log('OK Pressed')},
                 {text: 'Find Scholarships', onPress: () => {this.props.navigation.navigate('ThirdView')}},
          ]
      )
    }
    async receiptValidate(receipt, coin){
      const receiptBody = {
        'receipt-data': `${receipt}`,
      };
      const result = await RNIap.validateReceiptIos(receiptBody, false);
      //send coin number
      console.log(result)
    }
    async componentDidMount() {
        try {
          await RNIap.initConnection();
          AsyncStorage.getItem('TOKEN', (err, result)=>{
            if (result){
              //get user here
              this.setState({token: result})
            }
          })
          const products = await RNIap.getProducts(itemSkus);
          this.setState({ products },()=>{
              //alert(products.toString())
              console.log(products)
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
                    <Text style={{marginTop:40}}>Two Coins</Text>
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
                    <Text style={{marginTop:40}}>Three Coins</Text>
                    <Text style={{fontSize:35, color:'black', fontWeight:'bold', marginTop:10}}>$3.99</Text>
                    <TouchableOpacity onPress={this.buyThreeCoin} style={{height: 35, marginTop:15, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'center', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
                    <Icon name="shopping-cart" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", marginHorizontal:10}}>Buy Coin</Text>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={this.buyFourCoin  
              }
            useForeground={true}
            background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{borderBottomWidth: 4, borderBottomColor:'#085078', alignItems:'center', marginHorizontal:10, marginVertical: 10, backgroundColor:'white', height:200, elevation:2, width:'80%'}}>
                    <Text style={{marginTop:40}}>Four Coins</Text>
                    <Text style={{fontSize:35, color:'black', fontWeight:'bold', marginTop:10}}>$5.99</Text>
                    <TouchableOpacity onPress={this.buyFourCoin} style={{height: 35, marginTop:15, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'center', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
                    <Icon name="shopping-cart" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", marginHorizontal:10}}>Buy Coin</Text>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>
            </View>
            </ScrollView>
        )
    }
}

function mapper(state) {
  return {
      is_fetching: state.user.is_fetching,
      currentUser: state.user.data,
      error: state.user.error,
      redirect: state.user.redirect
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      verifyAndroid: (url, token, coin, receipt, packageName, product, user, nav, e) => 
      {
        dispatch(
          verifyAndroidCall(url, token, coin, receipt, packageName, product, user, nav, e)
        );
      },
  };
};

export default connect(mapper, mapDispatchToProps)(BuyCoinScreen);