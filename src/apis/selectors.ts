import {selector, selectorFamily} from "recoil";
import {Token, tokenState} from "@apis/atoms";
import {getUser, postGooleLoginFinish, postLogin, postRegistration} from "@apis/apiServices";
import {GOOGLELOGIN_POST_ERROR, LOGIN_POST_ERROR, REGISTRATION_POST_ERROR, USER_GET_ERROR} from "@apis/types";

interface Body {
    [key: string]: string | number;
}

export const loginSelector = selectorFamily<Token, Body>({
    key: 'loginSelector',
    get: (body) => async ({}) => {
        if(!body) return LOGIN_POST_ERROR;
        return postLogin(body)
            .then((response) => response.data)
            .catch(err => LOGIN_POST_ERROR);
    }
})

export const registrationSelector = selectorFamily<Token, Body>({
    key: 'loginSelector',
    get: (body) => async ({}) => {
        return postRegistration(body)
            .then((response) => response.data)
            .catch(err => REGISTRATION_POST_ERROR);
    }
})

export const getUserSelector = selector({
    key: 'loginSelector',
    get:async ({get}) => {
        return getUser("Bearer " + get(tokenState).accessToken)
            .then((response) => response.data)
            .catch(err => USER_GET_ERROR);
    }
})

export const googleLoginSelector = selectorFamily<Token, Body>({
    key: 'loginGoogleSelector',
    get: (body) => async ({}) => {
        if(!body) return GOOGLELOGIN_POST_ERROR;
        return postGooleLoginFinish(body)
            .then((response) => response.data)
            .catch(err => GOOGLELOGIN_POST_ERROR);
    }
})