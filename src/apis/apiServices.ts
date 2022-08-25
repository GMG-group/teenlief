import axios, {AxiosResponse} from "axios";

const PROTOCOL = "http://";
const AND_DEV_URL = PROTOCOL + "10.0.2.2:8000";
const IOS_DEV_URL = PROTOCOL +  "127.0.0.1:8000";
const URL = AND_DEV_URL;

export const postLogin = (body:any):Promise<AxiosResponse> => {
    return axios.post (
        `${URL}/api/accounts/v1/login/`,
        body, {
            withCredentials: false
        },
    )
}

export const postRegistration = (body:any):Promise<AxiosResponse> => {
    return axios.post (
        `${URL}/api/accounts/v1/registration/`,
        body, {
            withCredentials: false
        },
    )
}

export const postGooleLoginFinish = (body:any):Promise<AxiosResponse> => {
    console.log(body)
    return axios.post(
        `${URL}/api/accounts/v1/login/google/finish/`,
        body, {
            withCredentials: false
        }
    )
}

export const getUser = (token:string):Promise<AxiosResponse> => {
    console.log("get user", token);
    return axios.get(
        `${URL}/api/accounts/v1/user/`,
        {
            withCredentials: false,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
    )
}

export const postMarker = (token:string, body:any):Promise<AxiosResponse> => {
    console.log("postMarker", body);
    return axios.post(
        `${URL}/api/marker/`,
        body, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
    )
}

export const getMarker = (token:string):Promise<AxiosResponse> => {
    console.log("get marker", token);
    return axios.get(
        `${URL}/api/marker/`,
         {
             withCredentials: false,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
    )
}
