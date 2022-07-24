import {selector, selectorFamily} from "recoil";
import {Token, tokenState} from "@apis/atoms";
import {postLogin} from "@apis/apiServices";

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
    get: (body) => async ({get}) => {
        return await postLogin(body);
    }
})