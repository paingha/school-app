import {requestScholarship, receiveScholarship, errorScholarship} from '../actions/scholarship';
import { AsyncStorage, Alert } from "react-native"
import {getUserCall} from './user';

export function scholarshipSearchCall(url, token, major, amount, gpa, level, criteria, applicantCountry, country, user_id, offset){
    if(url && major && amount && gpa && level && criteria && applicantCountry && country){
    return (dispatch) => {
        dispatch(requestScholarship())
        fetch(`${url}`, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
                         mode: 'cors',
                         body: JSON.stringify({major, gpa, amount, level, criteria, applicantCountry, country, user_id, offset})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                
                    dispatch(receiveScholarship(json))
                    
                //alert(json.token);
            })
            .catch(error=>dispatch(errorScholarship(error.message)));
        }
    }
}

export function scholarshipSaveCall(url, token, user_id, scholarship_id, savedArray){
    if(url && user_id && scholarship_id && savedArray && token){
        let saved_ID = savedArray
        saved_ID.push(parseInt(scholarship_id))
    return (dispatch) => {
        fetch(`${url}`.replace('{user_id}', user_id), {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
                         mode: 'cors',
                         body: JSON.stringify({scholarship_id})
                 })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                //alert(user_id + ' ' + token)
                //dispatch(getUserCall(user_id, token))
                    
                //alert(json.token);
            })
            .catch(error=> alert('An error occured'));
        }
    }
}

export function scholarshipUnSaveCall(url, token, user_id, scholarship_id, savedArray){
    if(url && user_id && scholarship_id && token){
    return (dispatch) => {
        fetch(`${url}`.replace('{user_id}', user_id), {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
                         mode: 'cors',
                         body: JSON.stringify({scholarship_id})
                 })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);

                //dispatch(getUserCall(user_id, token))  
                //alert(json.token);
            })
            .catch(error=> alert('An error occured'));
        }
    }
}