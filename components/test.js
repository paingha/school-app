import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  NativeModules,
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as RNIap from 'react-native-iap';


// App Bundle > com.dooboolab.test

const itemSkus = Platform.select({
  ios: [
    'com.cooni.point1000', 'com.cooni.point5000', // dooboolab
  ],
  android: [
    'com.theacademist_app', // subscription
  ],
});

const itemSubs = Platform.select({
  ios: [
    'com.cooni.point1000', 'com.cooni.point5000', // dooboolab
  ],
  android: [
    'com.theacademist_app', // subscription
  ],
});

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      receipt: '',
      availableItemsMessage: '',
    };
  }

  async componentDidMount() {
    try {
      const result = await RNIap.initConnection();
      console.log('result', result);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }


  getItems = async() => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      // const products = await RNIap.getSubscriptions(itemSkus);
      console.log('Products', products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  getSubscriptions = async() => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('Products', products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  buyItem = async(sku) => {
    try {
      console.info('buyItem: ' + sku);
      // const purchase = await RNIap.buyProduct(sku);
      // const products = await RNIap.buySubscription(sku);
      const purchase = await RNIap.buyProductWithoutFinishTransaction(sku);
      console.info(purchase);
      this.setState({ receipt: purchase.transactionReceipt });
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  }

  buySubscribeItem = async(sku) => {
    try {
      console.log('buySubscribeItem: ' + sku);
      const purchase = await RNIap.buySubscription(sku);
      console.info(purchase);
      this.setState({ receipt: purchase.transactionReceipt });
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  }

  getAvailablePurchases = async() => {
    try {
      console.info('Get available purchases (non-consumable or unconsumed consumable)');
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases :: ', purchases);
      if (purchases && purchases.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  }

  render() {
    const { productList, receipt, availableItemsMessage } = this.state;
    const receipt100 = receipt.substring(0, 100);

    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
        </View>
        <View style={ styles.content }>
          <ScrollView
            style={{ alignSelf: 'stretch' }}
          >
            <View style={{ height: 50 }} />
            <TouchableOpacity style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'flex-end', marginRight:20}} 
            onPress={this.getItems}>
            <Text>Get available purchases</Text></TouchableOpacity>

            <Text style={{ margin: 5, fontSize: 15, alignSelf: 'center' }} >{availableItemsMessage}</Text>

            <Text style={{ margin: 5, fontSize: 9, alignSelf: 'center' }} >{receipt100}</Text>

            <TouchableOpacity style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'flex-end', marginRight:20}} 
              onPress={() => this.getItems()}
            ><Text>Get Products ({productList.length})</Text></TouchableOpacity>
            {
              productList.map((product, i) => {
                return (
                  <View key={i} style={{
                    flexDirection: 'column',
                  }}>
                    <Text style={{
                      marginTop: 20,
                      fontSize: 12,
                      color: 'black',
                      alignSelf: 'center',
                    }} >{JSON.stringify(product)}</Text>
                    <TouchableOpacity style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'flex-end', marginRight:20}} 
                      onPress={() => this.buyItem(product.productId)}
                    ><Text>Buy Above Product</Text></TouchableOpacity>
                    
                  </View>
                );
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flex: 8.8,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 87.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  
  txt: {
    fontSize: 19,
    color: 'white',
  },
});

export default Page;