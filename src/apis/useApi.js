import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import {useRecoilCallback} from "recoil";
import {tokenState} from "@apis/atoms";

const useApi = (api, authHeader=false) => {
    const [loading, setLoading] = useState(true);
    const [resolved, setResolved] = useState();

    const makeHeaders = (token) => {
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
        return headers
    }


    const callback = useRecoilCallback(({snapshot, set}) =>
            async (...args) => {
                let access_token;
                if(authHeader) {
                    access_token = (await snapshot.getPromise(tokenState)).accessToken;
                }
                const {data} = await api(authHeader ? makeHeaders(access_token) : null, ...args);
                setLoading(false);
                setResolved(data);
                return data
            },
        [],
    );
    return [loading, resolved, callback];
}

export default useApi;