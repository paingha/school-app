import {errorForum, receiveForum, requestForum, errorForumSearch, searchForum, receiveForumResult} from '../actions/forum';
import { AsyncStorage } from "react-native"

export function getForumCall(url, offset){
    return (dispatch) => {
        dispatch(requestForum())
        fetch(`${url}`.replace('{off}', offset), {
                         method: 'GET',  
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors'
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                    dispatch(receiveForum(json))
                    //alert(json)
                //alert(json.token);
            })
            .catch(error=>dispatch(errorForum(error.message)));
        }
}

export function searchForumCall(url, q){
    return (dispatch) => {
        dispatch(searchForum())
        fetch(`${url}`, {
                         method: 'POST',  
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors',
                         body: JSON.stringify({q})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                    dispatch(receiveForumResult(json))
                    //alert(json)
                //alert(json.token);
            })
            .catch(error=>dispatch(errorForumSearch(error.message)));
        }
}
