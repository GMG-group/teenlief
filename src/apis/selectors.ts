import {selector, selectorFamily} from "recoil";
import {Token, tokenState} from "@apis/atoms";
import {postLogin} from "@apis/apiServices";
import {LOGIN_POST_ERROR} from "@apis/types";

export const tokenSelector = selector<Token>({
    key: 'tokenSelector',
    get: async ({get}) => {
        return get(tokenState);
    },
    set: ({set}, newToken) => {
        set(tokenState, newToken);
    }
})

export const loginSelector = selectorFamily({
    key: 'loginSelector',
    get: (body) => async ({}) => {
        return postLogin(body)
            .then((response) => response.data)
            .catch(err => LOGIN_POST_ERROR);
    }
})