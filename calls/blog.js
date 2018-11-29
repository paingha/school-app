import {errorBlog, receiveBlog, requestBlog} from '../actions/blog';
import { AsyncStorage } from "react-native"

export function getBlogCall(url, offset){
    return (dispatch) => {
        dispatch(requestBlog())
        fetch(`${url}`.replace('{off}', offset), {
                         method: 'GET',  
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors'
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                    dispatch(receiveBlog(json))
                    //alert(json)
                //alert(json.token);
            })
            .catch(error=>dispatch(errorBlog(error.message)));
        }
}
