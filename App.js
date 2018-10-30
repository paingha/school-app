import React from 'react';
import { StyleSheet, AsyncStorage, StatusBar, View, Text, Image } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {prepareStore} from './store/store';
import Loading from './components/loading';
import {login, getUser} from './settings'
import { isSignedIn } from "./lib/auth";
import {errorLogin, requestUser, receiveUser} from './actions/user';
import Wrapper from './wrapper';

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

export default class App extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    loadingNow: true,
    hasToken: false,
    boardedState: null,
    signedIn: null,
    boardedState: null,
    checkedSignIn: null
  }
}
componentWillMount(){
  isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true}, ()=>{
        AsyncStorage.getItem('@OnBoarded', (err, result) => {
          //if (result){
            setTimeout(()=>{
              this.setState({loadingNow: false, boardedState: result},()=>{
                
              })
            }, 2000)
          //}
          /*if(err){
            this.setState({loadingNow: true})
          }*/
        });
      }))
      .catch(err => alert("An error occurred"));
}
componentDidMount(){
  /*if(token) {
    store.dispatch(requestUser());
    fetch(getUser.replace('{user_id}', user.id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
    .then(response=>response.json())
    .then(json=>{
        if (json.error)
            throw new Error(json.error.message);
        store.dispatch(receiveUser(json));
        //alert(json)
    })
    .then(e =>{
      //this.props.navigation.navigate('App');
      this.setState({hasToken: true})
    }
  
    )
    .catch(error=>store.dispatch(errorLogin(error.message)))
    // .then(()=>
    // );
  }*/
  }
  render() {
    if(this.state.loadingNow){
    return <Loading />
    }
    else{
    return(
      <Provider store={store} >
       <Wrapper boardState={this.state.boardedState} signedIn={this.state.signedIn} checkedSignIn={this.state.checkedSignIn} />
      </Provider>
    )
    }

  } 
}

