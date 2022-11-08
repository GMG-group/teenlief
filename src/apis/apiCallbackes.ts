import {useRecoilCallback, useRecoilValue} from "recoil";
import {
    postGooleLoginFinish,
    postLogin,
    postMarker,
    postRegistration,
    postTokenRefresh,
    getUser
} from "@apis/apiServices";
import {tokenState, userState} from "@apis/atoms";
import Toast from "react-native-toast-message";
import RNRestart from 'react-native-restart';

export const usePostGoogleLoginFinishCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                const {data} = await postGooleLoginFinish(body)
                    .catch(err => {console.log("err!!",err.message); return err})
                console.log("postGooleLoginFinish ", data);
                set(tokenState, {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token
                });

                set(userState, data.user);
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

                set(userState, data.user);
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

                set(userState, data.user);
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
                        return res.status
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
                                text1: '인증이 만료되었으므로 재로그인이 필요합니다',
                                text2: '3초후 재시작합니다.',
                            })
                            setTimeout(() => {
                                RNRestart.Restart();
                            },3000)
                        }
                        return err.response.status
                    });
            },
        [],
    );
}