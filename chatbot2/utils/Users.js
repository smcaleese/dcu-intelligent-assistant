import axios from 'axios';
import { apiURL } from '../config';

export const signup = async (email, password) => {
    try {
        const response = await axios.post(apiURL + 'signup', { email: email, password: password })
        return response.data
    } 
    catch(err) {
        console.log("error:", err)
    }   
}

export const login = async (email, password) => {
    try {
        const res = await axios.post(apiURL + 'login', { email: email, password: password })
        return [res.data.message, res.data.token]
    } 
    catch(err) { 
        console.log("error:", err) 
    }
}

export const checkToken = async (token) => {
    try {
        const postRes = await axios.post(apiURL + 'checkToken', { token: token })
        const message = postRes.data.message

        if(message === "token is valid") {
            const email = postRes.data.email
            return [true, email]
        } else {
            return [false, null]
        }
    } 
    catch(err) { 
        console.log(err)
        return ["error", null] 
    }
}

export const deleteAccount = async (email) => {
    try {
        const res = await axios.post(apiURL + 'deleteAccount', {email: email})
        return res.data
    }
    catch(err) {
        console.log(err)
    }
}