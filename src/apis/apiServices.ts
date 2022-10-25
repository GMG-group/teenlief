import axios, {AxiosResponse} from "axios";
import Config from "react-native-config";

const PROTOCOL = "http://";
export const DOMAIN = "teenlief.com"
const AND_DEV_URL = PROTOCOL + "10.0.2.2:8000";
const IOS_DEV_URL = PROTOCOL +  "127.0.0.1:8000";
const URL = AND_DEV_URL

export const postLogin = (body: any):Promise<AxiosResponse> => {
    return axios.post (
        `${URL}/api/accounts/v1/login/`,
        body, {
            withCredentials: false
        },
    )
}

export const postRegistration = (body: any):Promise<AxiosResponse> => {
    return axios.post (
        `${URL}/api/accounts/v1/registration/`,
        body, {
            withCredentials: false
        },
    )
}

export const postGooleLoginFinish = (body: any):Promise<AxiosResponse> => {
    return axios.post(
        `${URL}/api/accounts/v1/login/google/finish/`,
        body, {
            withCredentials: false
        }
    )
}

export const getUser = (header: any):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/accounts/v1/user/`,
        {
            withCredentials: false,
            headers: header
        }
    )
}

export const postMarker = (header: any, body: any):Promise<AxiosResponse> => {
    return axios.post(
        `${URL}/api/marker/`,
        body, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...header
            }
        }
    )
}

export const getMarkerDetail = (header: any, id: number):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/marker/${id}`,
         {
             withCredentials: false,
             headers: header
        }
    )
}

export const getChatRoomList = (header: any):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/chat/`,
        {
            withCredentials: false,
            headers: header
        }
    )
}

export const getChatLog = (header: any, id: number):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/chat/${id}/`,
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

export const getMarkerSimple = (header: any):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/marker-simple/`,
        {
            withCredentials: false,
            headers: header
        }
    )
}

export const postTokenRefresh = (body:any):Promise<AxiosResponse> => {
    return axios.post(
        `${URL}/api/accounts/v1/token/refresh/`,
        body
    );
}

export const getTag = (body: any):Promise<AxiosResponse> => {
    console.log("getTAg1!!")
    return axios.get(
        `${URL}/api/tag/`
    )
}

export const checkUserMarkerExists = (header: any, id: any):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/check-user-marker-exists/${id}/`,
        {
            withCredentials: false,
            headers: header
        }
    )
}

export const postChatRoom = (header: any, body: any):Promise<AxiosResponse> => {
    return axios.post(
        `${URL}/api/chat/`,
        body, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...header
            }
        }
    )
}

export const getShelters = (header: any) :Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/shelter/`,
        {
            withCredentials: false,
            headers: header
        }
    )
}

export const getReview = (header: any) :Promise<AxiosResponse> => {
    console.log("getReview", header);
    return axios.get(
        `${URL}/api/review/`,
        {
            withCredentials: false,
            headers: header
        }
    )
}

export const getMarkerReview = (header: any, id: any):Promise<AxiosResponse> => {
    return axios.get(
        `${URL}/api/review/${id}/`,
        {
            withCredentials: false,
            headers: header
        }
    )
}

export const deleteReview = (header: any, id: number) :Promise<AxiosResponse> => {
    return axios.delete(
        `${URL}/api/review/${id}/`,
        {
            withCredentials: false,
            headers: header
        }
    )
}