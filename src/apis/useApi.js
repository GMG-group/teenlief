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
        if(err.response.status === 403) {
            console.log("403")
            return postTokenRefresh({"refresh": refreshToken})
                .then(() => {
                    console.log("tokenRefresh finished")
                    return {data:callback(...args)}
                })
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
                }
                const {data} = authHeader ? (
                    await api(makeHeaders(accessToken), ...args)
                        .catch(err => errorHandling(err, refreshToken, ...args))
                ) : (
                    await api(...args)
                        .catch(err => errorHandling(err, refreshToken, ...args))
                );
                setResolved(data);
                setLoading(false);
                console.log("final data",data);
                return data
            },
        [],
    );
    return [loading, resolved, callback, setLoading];
}

export default useApi;