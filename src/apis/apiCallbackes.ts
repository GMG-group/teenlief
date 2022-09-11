import {useRecoilCallback, useRecoilValue} from "recoil";
import {
    postGooleLoginFinish,
    postLogin,
    postMarker,
    postRegistration,
    postTokenRefresh
} from "@apis/apiServices";
import {tokenState} from "@apis/atoms";
import {MARKER_POST_ERROR} from "@apis/types";
import Toast from "react-native-toast-message";

export const usePostGoogleLoginFinishCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                const {data} = await postGooleLoginFinish(body);
                console.log("postGooleLoginFinish ", data);
                set(tokenState, {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token
                });
            },
        [],
    );
}

export const usePostLoginCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                const {data} = await postLogin(body);
                console.log("postLogin ", data);
                set(tokenState, {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token
                });
            },
        [],
    );
}

export const usePostRegistrationCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                const {data} = await postRegistration(body);
                console.log("postRegistration ", data);
                set(tokenState, {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token
                });
            },
        [],
    );
}

export const usePostMarkerCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                const token = await snapshot.getPromise(tokenState);
                return await postMarker(token.accessToken, body);
            },
        [],
    );
}

export const usePostTokenRefreshCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                return await postTokenRefresh(body)
                    .then((res) => {
                        const {data} = res;
                        console.log("data", data);
                        set(tokenState, {
                            accessToken: data.access,
                            refreshToken: body.refresh
                        });
                        return res.status;
                    })
                    .catch(err => {
                        console.log("token refresh error", err.response.status)
                        if(err.response.status === 401) {
                            set(tokenState, {
                                accessToken: '',
                                refreshToken: ''
                            });
                            Toast.show({
                                type: 'error',
                                text1: '인증 만료',
                                text2: '재로그인이 필요합니다.',
                            })
                        }
                        return err.status;
                    });
            },
        [],
    );
}