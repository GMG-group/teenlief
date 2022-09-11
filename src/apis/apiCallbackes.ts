import {useRecoilCallback, useRecoilValue} from "recoil";
import {getMarker, getUser, postGooleLoginFinish, postLogin, postMarker, postRegistration} from "@apis/apiServices";
import {tokenState, userState} from "@apis/atoms";
import {MARKER_POST_ERROR} from "@apis/types";

export const usePostGoogleLoginFinishCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async (body) => {
                const {data} = await postGooleLoginFinish(body);
                console.log("postGooleLoginFinish ", data);
                set(tokenState, {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token
                });

                set(userState, {
                    user: data.user
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

                set(userState, {
                    user: data.user
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

                set(userState, {
                    user: data.user
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

export const useGetMarkerCallback = () => {
    return useRecoilCallback(({snapshot, set}) =>
            async () => {
                const token = await snapshot.getPromise(tokenState);
                return await getMarker(token.accessToken);
            },
        [],
    );
}