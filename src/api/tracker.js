import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

const trackerApi = axios.create({
    baseURL: 'https://8e1e-2600-1702-1280-add0-b93d-29ec-83d7-5bca.ngrok-free.app'
})

trackerApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token'); // Or wherever you store the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default trackerApi