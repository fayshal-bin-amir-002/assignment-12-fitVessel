import { Button, Input, Textarea } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { uploadImage } from "../../../utils/imageUpload";

const AddNewClass = () => {

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (newClass) => {
            const { data } = await axiosSecure.post(`/add-class?email=${user?.email}`, newClass);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                Swal.fire({
                    title: "Success",
                    text: "Your successfully added a new class.",
                    icon: "success"
                });
            } else {
                toast.error("Something went wrong!");
            }
        }
    })

    const handleAddClass = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.files[0];
        const details = form.details.value;

        try {
            const img_url = await uploadImage(photo);
            const newClass = {
                name: name,
                description: details,
                image: img_url,
                totalBooking: 0
            }
            await mutateAsync(newClass);
            form.reset();

        } catch (error) {
            toast.error(error.message);
        }

    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] w-full ">
            <form onSubmit={handleAddClass} className=" bg-gray-100 p-6 md:p-8 lg:p-10 w-full lg:w-10/12 xl:w-1/2 flex flex-col gap-4 lg:gap-6 rounded-lg shadow-md">
                <Input name="name" type="text" label="Class Name" className="bg-white" required />
                <Input name="photo" type="file" accept="image" label="Class Image" className="bg-white" required />

                <Textarea name='details' label="Class Description" required />

                <div className='pt-6 text-right'>
                    <Button type="submit" className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span className="relative text-base">Add Class</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddNewClass;