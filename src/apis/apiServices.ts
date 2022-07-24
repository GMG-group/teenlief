import axios, {AxiosResponse} from "axios";

const URL = "http://10.0.2.2:8000";

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
