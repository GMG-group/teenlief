import {useRecoilCallback, useRecoilValue} from "recoil";
import {
    getMarker,
    getUser,
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
                await postTokenRefresh(body)
                    .then(({data}) => {
                        console.log("data", data);
                        set(tokenState, {
                            accessToken: data.access,
                            refreshToken: body.refresh
                        });
                    })
                    .catch(err => {
                        if(err.response.status === 401) {
                            Toast.show({
                                type: 'error',
                                text1: 'API에러',
                                text2: err.response.detail,
                            })
                        }
                    });
            },
        [],
    );
}