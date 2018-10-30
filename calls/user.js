import {requestLogin, receiveLogin, errorLogin, receiveUser, requestUser, errorRegister, registerUser, errorForgot, forgotUser} from '../actions/user';
import { AsyncStorage } from "react-native"

export function getUserCall(url, userID, token){
    return (dispatch) => {
        dispatch(requestUser())
        fetch(`https://www.theacademist.com/api/v1/user/${userID}`, {
                         method: 'GET',  
                         headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
                         mode: 'cors'
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                    alert(json.user.id)
                    dispatch(receiveUser(json))
                //alert(json.token);
            })
            .catch(error=>dispatch(errorLogin(error.message)));
        }
}


export function loginUserCall(url, email, password, nav){
    if(url && email && password){
    return (dispatch) => {
        dispatch(requestLogin())
        fetch(`${url}`, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors',
                         body: JSON.stringify({email, password})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                AsyncStorage.setItem('TOKEN', json.token, ()=> {
                    dispatch(receiveLogin(json))
                    //if first sign in redirect to setup screen else signedIn screen (json.user.firstLogin)
                    nav.navigate("SignedIn")
                  })
                //alert(json.token);
            })
            .catch(error=>dispatch(errorLogin(error.message)));
        }
    }
}

export function facebookLoginUserCall(url, email, userId, token, nav){
        return (dispatch) => {
            dispatch(requestLogin())
            fetch(`${url}`, {
                             method: 'POST',
                             headers: {'Content-Type': 'application/json'},
                             mode: 'cors',
                             body: JSON.stringify({email, userId, token})
                         })
                .then(response=>response.json())
                .then(json=>{
                    if (json.error)
                        throw new Error(json.error.message);
                    AsyncStorage.setItem('TOKEN', json.token, ()=> {
                        dispatch(receiveLogin(json))
                        nav.navigate("SignedIn")
                      })
                    alert(json.token);
                })
                .catch(error=>dispatch(errorLogin(error.message)));
            }
}

export function googleLoginUserCall(url, email, nav){
    return (dispatch) => {
        dispatch(requestLogin())
        fetch(`${url}`, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors',
                         body: JSON.stringify({email})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                AsyncStorage.setItem('TOKEN', json.token, ()=> {
                    dispatch(receiveLogin(json))
                    nav.navigate("SignedIn")
                  })
                alert(json.token);
            })
            .catch(error=>dispatch(errorLogin(error.message)));
        }
}

export function registerUserCall(url, email, firstName, lastName, password, nav){
    return (dispatch) => {
        dispatch(requestLogin());
        fetch(`${url}`, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors',
                         body: JSON.stringify({email, firstName, lastName, password})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                dispatch(registerUser())
                nav.navigate("Registered")
                
            })
            .catch(error=>dispatch(errorRegister(error.message)));
    };
}

export function facebookRegisterUserCall(url, email, firstName, lastName, userId, token, nav){
    return (dispatch) => {
        dispatch(requestLogin());
        fetch(`${url}`, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors',
                         body: JSON.stringify({email, firstName, lastName, userId, token})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                dispatch(registerUser())
                nav.navigate("Registered")
                
            })
            .catch(error=>dispatch(errorRegister(error.message)));
    };
}

export function googleRegisterUserCall(url, email, firstName, lastName, nav){
    return (dispatch) => {
        dispatch(requestLogin());
        fetch(`${url}`, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors',
                         body: JSON.stringify({email, firstName, lastName})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                dispatch(registerUser())
                nav.navigate("Registered")
                
            })
            .catch(error=>dispatch(errorRegister(error.message)));
    };
}

export function forgotUserCall(url, email, nav){
    return (dispatch) => {
        if (url && email){
        dispatch(requestLogin());
        fetch(`${url}`, {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         mode: 'cors',
                         body: JSON.stringify({email})
                     })
            .then(response=>response.json())
            .then(json=>{
                if (json.error)
                    throw new Error(json.error.message);
                dispatch(forgotUser())
                nav.navigate("Sent")
                
            })
            .catch(error=>dispatch(errorForgot(error.message)));
    };
}
}