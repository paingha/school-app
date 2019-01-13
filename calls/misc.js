import {errorMajor, receiveMajor, requestMajor} from '../actions/major';
import {errorStates, receiveStates, requestStates} from '../actions/state';
import {errorCountry, receiveCountry, requestCountry} from '../actions/country';
import { AsyncStorage, Alert } from "react-native"
import {getUserCall, refreshUserCall} from './user';

export function verifyAndroidCall(url, token, coin, receipt, packageName, product, user_id, nav, e){
    return (dispatch) => {
        //console.log(JSON.stringify({coin, receipt, packageName, product, user}))
        fetch(`${url}`, {
            method: 'POST',  
            headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
            mode: 'cors',
            body: JSON.stringify({coin, receipt, packageName, product, user_id})
              })
          .then(response=>response.json())
          .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
            //console.log(json)
                e();
                
          })
          .then(()=>{
            dispatch(refreshUserCall(user_id, token))
          })
          .catch(error=>{
            Alert.alert(
                'Success!',
                `${coin} coins successfully added to your wallet`,
                [
                       {text: 'Close', onPress: () => console.log('OK Pressed')},
                       {text: 'Find Scholarships', onPress: () => {nav.navigate('ThirdView')}},
                ]
            )
            dispatch(refreshUserCall(user_id, token))
          });
    }
}

export function getMajorsCall(url){
    return (dispatch) => {
        dispatch(requestMajor())
        fetch(`${url}`, {
                         method: 'GET',  
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors'
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                    dispatch(receiveMajor(json))
            })
            .catch(error=>dispatch(errorMajor(error.message)));
        }
}

export function getStatesCall(url){
    return (dispatch) => {
        let firstMajor = {
            label: 'All',
            value: 'All'
        }
        dispatch(requestStates())
        fetch(`${url}`, {
                         method: 'GET',  
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors'
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                    dispatch(receiveStates([firstMajor, ...json]))
            })
            .catch(error=>dispatch(errorStates(error.message)));
        }
}

export function getApplicantCountriesCall(url){
    return (dispatch) => {
        dispatch(requestCountry())
        fetch(`${url}`, {
                         method: 'GET',  
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors'
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                    dispatch(receiveCountry(json))
            })
            .catch(error=>dispatch(errorCountry(error.message)));
        }
}
