import {requestGpaSchool, receiveGpaSchool, errorGpaSchool} from '../actions/gpaSchool';
import { AsyncStorage } from "react-native"

export function gpaSearchCall(url, token, gpa, level, state, user_id, offset){
    if(url && gpa && level && state){
    return (dispatch) => {
        dispatch(requestGpaSchool())
        fetch(`${url}`, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
                         mode: 'cors',
                         body: JSON.stringify({state, gpa, level, user_id, offset})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                
                    dispatch(receiveGpaSchool(json))
                    
                //alert(json.token);
            })
            .catch(error=>dispatch(errorGpaSchool(error.message)));
        }
    }
}
