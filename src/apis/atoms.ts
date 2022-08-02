import { atom } from "recoil";

export interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface UserInfo {
    email: string
}

export const tokenState = atom<Token> ({
    key: "token",
    default: {
        accessToken: "",
        refreshToken: ""
    }
});

export const userInfoState = atom<UserInfo> ({
    key: "userinfo",
    default: {
        email: ""
    }
})