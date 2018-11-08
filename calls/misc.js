import {errorMajor, receiveMajor, requestMajor} from '../actions/major';
import {errorStates, receiveStates, requestStates} from '../actions/state';
import {errorCountry, receiveCountry, requestCountry} from '../actions/country';
import { AsyncStorage } from "react-native"

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
                    //alert(json)
                //alert(json.token);
            })
            .catch(error=>dispatch(errorMajor(error.message)));
        }
}

export function getStatesCall(url){
    return (dispatch) => {
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
                    dispatch(receiveStates(json))
                    //alert(json)
                //alert(json.token);
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
                    //alert(json)
                //alert(json.token);
            })
            .catch(error=>dispatch(errorCountry(error.message)));
        }
}
