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
    return axios.post(
        `${URL}/api/accounts/v1/login/google/finish/`,
        body, {
            withCredentials: false
        }
    )
}

export const getUser = (token: string):Promise<AxiosResponse> => {
    return axios.get (
        `${URL}/api/accounts/v1/user/`,
        {
            withCredentials: false,
            headers: {
                Authorization: token
            }
        }
    )
}