import jwtDecode from 'jwt-decode';
import {getUserCall} from '../calls/user';

export function decodeToken(token){
    return new Promise((resolve, reject)=>{
        const userId = jwtDecode(token);
        if (userId){
            resolve(userId)
        }
        else{
            const reason = new Error('Invalid Token')
            reject(reason)
        }
    })
}

export function getUser(store, user_id, token){
    store.dispatch(getUserCall(user_id, token))
    return true
}