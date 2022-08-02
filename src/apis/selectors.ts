import {selector, selectorFamily} from "recoil";
import {Token, tokenState} from "@apis/atoms";
import {getUser, postGooleLoginFinish, postLogin} from "@apis/apiServices";
import {GOOGLELOGIN_POST_ERROR, LOGIN_POST_ERROR, USER_GET_ERROR} from "@apis/types";

interface Body {
    [key: string]: string | number;
}

export const loginSelector = selectorFamily<Token, Body>({
    key: 'loginSelector',
    get: (body) => async ({}) => {
        return postLogin(body)
            .then((response) => response.data)
            .catch(err => LOGIN_POST_ERROR);
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
        return postGooleLoginFinish(body)
            .then((response) => response.data)
            .catch(err => GOOGLELOGIN_POST_ERROR);
    }
})