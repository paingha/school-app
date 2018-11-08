import {requestScholarship, receiveScholarship, errorScholarship} from '../actions/scholarship';
import { AsyncStorage } from "react-native"

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
