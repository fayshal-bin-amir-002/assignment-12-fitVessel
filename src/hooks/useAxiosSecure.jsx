import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

const useAxiosSecure = () => {

    const { userLogOut } = useAuth();

    const navigate = useNavigate();

    return axiosSecure;
};

export default useAxiosSecure;