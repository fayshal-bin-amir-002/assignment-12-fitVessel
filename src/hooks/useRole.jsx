import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {

    const { user, loading } = useAuth();

    const axiosPublic = useAxiosPublic();

    const { data : role = '', isLoading, refetch } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/user/role/${user?.email}`);
            return data;
        }
    })

    return { role, isLoading, refetch };
};

export default useRole;