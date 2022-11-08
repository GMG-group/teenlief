import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";
import VerifyCertification from "@screens/VerifyCertification";

export interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    user: any
}

export const SCREEN = {
    Login: 'Login',
    SignUp: 'SignUp',
    Home: 'Home',
    Review: 'Review',
    ChatRoom: 'ChatRoom',
    Promise: 'Promise',
    MarkerManage: 'MarkerManage',
    Map: 'Map',
    Chat: 'Chat',
    Profile: 'Profile',
    Donate: 'Donate',
    Certification: 'Certification',
    VerifyCertification: 'VerifyCertification',
    ReviewList: 'ReviewList',
    MarkerRiviewList: 'MarkerRiviewList',
} as const;
type SCREEN = typeof SCREEN[keyof typeof SCREEN];

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