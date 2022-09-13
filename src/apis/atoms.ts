import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";

export interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    user: any
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

export const userState = atom<User> ({
    key: "user",
    default: {
        user: null
    },
    effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
})

export const actionState = atom<ACTION> ({
    key: "action",
    default: ACTION.Main
})