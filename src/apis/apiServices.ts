import axios, {AxiosResponse} from "axios";

const PROTOCOL = "http://";
const AND_DEV_URL = PROTOCOL + "10.0.2.2:8000";
const IOS_DEV_URL = PROTOCOL +  "127.0.0.1:8000";
const URL = IOS_DEV_URL;

export const postLogin = (body:any):Promise<AxiosResponse> => {
    return axios.post (
        `${URL}/api/accounts/v1/login/`,
        body, {
            withCredentials: false
        },
    )
}

export const getUser = ():Promise<AxiosResponse> => {
    return axios.get (
        `${URL}/api/accounts/v1/user/`,
    )
}
