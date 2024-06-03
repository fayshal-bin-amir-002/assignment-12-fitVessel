import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useClassesName = () => {
    const axiosPublic = useAxiosPublic();

    const { data : classes = [], isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/classes-name`);
            return data;
        }
    })

    return { classes, isLoading };
};

export default useClassesName;