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

export function getUser(url, user_id, token){
    getUserCall(url, user_id, token)
    return true
}