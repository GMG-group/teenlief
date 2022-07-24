import { atom } from "recoil";

export interface Token {
    accessToken: string | null;
    refreshToken: string | null;
}

export const tokenState = atom<Token> ({
    key: "token",
    default: {
        accessToken: null,
        refreshToken: null
    }
});
