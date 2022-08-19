import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";

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
    },
    effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const userInfoState = atom<UserInfo> ({
    key: "userinfo",
    default: {
        email: ""
    }
})