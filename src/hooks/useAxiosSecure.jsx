import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

const useAxiosSecure = () => {

    const { userLogOut } = useAuth();

    const navigate = useNavigate();

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        if(error.response.status === 401 || error.response.status === 403) {
            await userLogOut();
            navigate("/login");
        }
    })

    return axiosSecure;
};

export default useAxiosSecure;