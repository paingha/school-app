import { AsyncStorage } from "react-native";
import {decodeToken, getUser} from './getUser';
import {getUser as url } from '../././settings';

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
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('TOKEN', (err, result)=>{
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
