import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";

export interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface UserInfo {
    email: string
}

export const ACTION = {
    Main: 'main',
    Upload: 'upload'
} as const;
type ACTION = typeof ACTION[keyof typeof ACTION];

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

export const actionState = atom<ACTION> ({
    key: "action",
    default: ACTION.Main
})