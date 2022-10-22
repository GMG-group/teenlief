import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import {useRecoilCallback} from "recoil";
import {tokenState} from "@apis/atoms";
import {usePostTokenRefreshCallback} from "@apis/apiCallbackes";

export const useApi = (api, authHeader=false) => {
    const [loading, setLoading] = useState(true);
    const [resolved, setResolved] = useState();
    const postTokenRefresh = usePostTokenRefreshCallback();

    const makeHeaders = (token) => {
        const headers = {
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/json'
        }
        return headers
    }

    const errorHandling = (err, refreshToken, ...args) => {
        if(err.response.status === 403 || err.response.status === 401) {
            console.log("refresh token")
            return postTokenRefresh({"refresh": refreshToken})
                .then((status) => {
                    console.log("tokenRefresh finished")
                    if(status >= 400) return {status: false};
                    return {data: callback(...args), status: false};
                })
        } else {
            console.log("unhandled error", err.response.status, err.response)
            // setTimeout(() => {
            //     callback(...args);
            // }, 3000)
            return {status:false};
        }
    }

    const callback = useRecoilCallback(({snapshot, set}) =>
            async (...args) => {
                console.log("args", args);
                let accessToken, refreshToken;
                if(authHeader) {
                    const token = await snapshot.getPromise(tokenState)
                    accessToken = token.accessToken;
                    refreshToken = token.refreshToken;
                    console.log("accessToken token", accessToken);
                    console.log("refreshToken token", refreshToken);
                }
                const {data, status} = authHeader ? (
                    await api(makeHeaders(accessToken), ...args)
                        .catch(err => errorHandling(err, refreshToken, ...args))
                ) : (
                    await api(...args)
                        .catch(err => errorHandling(err, refreshToken, ...args))
                );
                if(!status) return;
                setResolved(data);
                setLoading(false);
                // console.log("final data",data);
                return data
            },
        [],
    );
    return [loading, resolved, callback, setLoading];
}

export default useApi;