import {requestMajorSchool, receiveMajorSchool, errorMajorSchool} from '../actions/majorSchool';
import { AsyncStorage, Alert } from "react-native"

export function majorSearchCall(url, token, major, level, country, state, offset){
    return (dispatch) => {
        dispatch(requestMajorSchool())
        //alert(state + " " + major + " " + level + " " + country + " " + offset)
        fetch(`${url}`, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
                         mode: 'cors',
                         body: JSON.stringify({major, level, country, state, offset})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                    dispatch(receiveMajorSchool(json))
                    
            })
            .catch(error=>dispatch(errorMajorSchool(error.message)));
        }
}
