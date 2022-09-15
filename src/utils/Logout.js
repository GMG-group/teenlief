import RNRestart from "react-native-restart";

export const logout = (setToken) => {
    setToken(
        {
            accessToken: "",
            refreshToken: ""
        }
    )
    setTimeout(() => {
        RNRestart.Restart();
    },500)
}