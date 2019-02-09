import React from 'react';
import { StyleSheet, AsyncStorage, ToastAndroid, BackHandler, StatusBar, View, Text, Image } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {prepareStore} from './store/store';
import Loading from './components/loading';
import {login, getUser} from './settings'
import { isSignedIn } from "./lib/auth";
import {errorLogin, requestUser, receiveUser} from './actions/user';
import Wrapper from './wrapper';
import OfflineNotice from './components/offline';
import { withNetworkConnectivity } from 'react-native-offline';

async function decode(a){
  try {
    jwtDecode(a)
  } catch (error) {
    console.log(error)
    return null
  }
}

//const token = AsyncStorage.getItem('TOKEN');
//const user = token ? decode(token) : null;
const store = prepareStore({
    //user: {token}
});

class App extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    loadingNow: true,
    hasToken: false,
    boardedState: null,
    signedIn: null,
    boardedState: null,
    checkedSignIn: null,
    connected: this.props.isConnected,
    backClickCount: 0
  }
}
componentWillMount(){
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  if(this.props.isConnected){
  isSignedIn(store)
      .then(res => this.setState({ signedIn: res, checkedSignIn: true}, ()=>{
        AsyncStorage.getItem('@OnBoarded', (err, result) => {
          //if (result){
            setTimeout(()=>{
              this.setState({loadingNow: false, boardedState: result},()=>{
                
              })
            }, 7000)
          //}
          /*if(err){
            this.setState({loadingNow: true})
          }*/
        });
      }))
      .catch(err => alert("An error occurred"));
    }
}


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}
countNow = () =>{
  this.setState({backClickCount: this.state.backClickCount + 1}, ()=>{
    ToastAndroid.showWithGravityAndOffset(
      'Press the back button again to exit app',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  })
}
handleBackButton = () => {
  this.state.backClickCount == 1 ? BackHandler.exitApp() : this.countNow();

  return true;
};
  render() {
    if(this.state.loadingNow){
    return <Loading />
    }
    else{
    if (this.props.isConnected || this.state.connected){
    return(
      <Provider store={store} >
       <Wrapper boardState={this.state.boardedState} signedIn={this.state.signedIn} checkedSignIn={this.state.checkedSignIn} />
      </Provider>
    )
  }
    else{
      return <OfflineNotice />
    }
    }

  } 
}

export default withNetworkConnectivity({
  withRedux: false,
  timeout: 4000,
  pingServerUrl: 'https://www.google.com/',
  withExtraHeadRequest: true,
  checkConnectionInterval: 3000,
  checkIntervalOfflineOnly: false,
  checkInBackground: false,
  httpMethod: 'HEAD',
})(App);