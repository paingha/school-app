import { AsyncStorage } from "react-native";
import {decodeToken, getUser} from './getUser';
import {getUser as url } from '../././settings';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export const onSignOut = (e) => {
  AsyncStorage.removeItem('TOKEN', (err, result)=>{
    if(err){
      alert(err)
    }
  })
  .then(
    ()=>{
      e.navigate("SignedOut")
    }
  )
}
_configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '638073687773-flr8fq4sifc9eue2bs4001dr23rjjtb4.apps.googleusercontent.com',
    offlineAccess: false,
  });
}
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('TOKEN', (err, result)=>{
      _configureGoogleSignIn()
      if (result){
        //get user here
        
        decodeToken(result)
        .then((user_id)=>{
          //api call
          //alert(user_id.id)
          getUser(url, user_id.id, result)
        })
        .then(()=>{
          resolve(true)
        })
      }
      else{
        resolve(false)
      }
      if (err){
        reject(err)
      }
    })
  });
};
