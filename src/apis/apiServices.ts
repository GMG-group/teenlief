import axios, {AxiosResponse} from "axios";
import Config from "react-native-config";

const PROTOCOL = "http://";
const AND_DEV_URL = PROTOCOL + "10.0.2.2:8000";
const IOS_DEV_URL = PROTOCOL +  "127.0.0.1:8000";
const URL = AND_DEV_URL;

export const postLogin = (body:any):Promise<AxiosResponse> => {
    return axios.post (
        `${URL}/api/accounts/v1/login/`,
        body, {
            withCredentials: false
        },
    )
}

export const postRegistration = (body:any):Promise<AxiosResponse> => {
    return axios.post (
        `${URL}/api/accounts/v1/registration/`,
        body, {
            withCredentials: false
        },
    )
}

export const postGooleLoginFinish = (body:any):Promise<AxiosResponse> => {
    return axios.post(
        `${URL}/api/accounts/v1/login/google/finish/`,
        body, {
            withCredentials: false
        }
    )
}

export const getUser = (header:any):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/accounts/v1/user/`,
        {
            withCredentials: false,
            headers: header
        }
    )
}

export const postMarker = (header:any, body:any):Promise<AxiosResponse> => {
    return axios.post(
        `${URL}/api/marker/`,
        body, {
            headers: header
        }
    )
}

export const getMarker = (header: any):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/marker/`,
         {
             withCredentials: false,
             headers: header
        }
    )
}

export const getReverseGeocoding = (cameraCoords: any):Promise<AxiosResponse> => {

    const coords = `${cameraCoords.longitude},${cameraCoords.latitude}`;
    console.log("Coords",coords);
    return axios.get(
        `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${coords}&orders=roadaddr&output=json`,
        {
            headers: {
                "X-NCP-APIGW-API-KEY-ID": Config.NAVER_MAP_API_KEY, // TODO: env파일에서 가져오기
                "X-NCP-APIGW-API-KEY": Config.NAVER_MAP_API_SECRET
            }
        }
    )
}