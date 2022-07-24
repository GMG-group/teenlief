import axios from "axios";
import {LOGIN_POST_ERROR, USER_GET_ERROR} from "@apis/types";

const URL = "http://10.0.2.2:8000";

export async function postLogin(body:any) {
    return await axios.post (
        `${URL}/api/accounts/v1/login/`,
        body, {
            withCredentials: false
        },
    )
        .then((response) => response.data)
        .catch(err => LOGIN_POST_ERROR);
}

export async function getUser() {
    return await axios.get (
        `${URL}/api/accounts/v1/user/`,
    )
        .then((response) => response.data)
        .catch(err => USER_GET_ERROR);
}
