import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";

export interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface UserInfo {
    email: string
}

export interface Action {
    action: string;
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

export const actionState = atom<Action> ({
    key: "action",
    default: {
        action: ""
    }
})