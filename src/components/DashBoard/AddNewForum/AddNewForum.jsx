import { Button, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import toast from "react-hot-toast";
import { uploadImage } from "../../../utils/imageUpload";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AddNewForum = () => {

    const { user } = useAuth();

    const { role } = useRole();

    const [tags, setTags] = useState([]);

    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (newBlog) => {
            const { data } = await axiosSecure.post(`/add-blog?email=${user?.email}`, newBlog);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                Swal.fire({
                    title: "Success",
                    text: "Your successfully added a new blog.",
                    icon: "success"
                });
            } else {
                toast.error("Something went wrong!");
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const photo = form.photo.files[0];
        const description = form.description.value;
        const category = form.category.value;

        if (tags.length === 0) return toast.error("Please enter tag!!");

        try {

            const photo_url = await uploadImage(photo);

            const forumData = {
                author: user?.displayName,
                author_img: user?.photoURL,
                role: role,
                likes: 0,
                dislikes: 0,
                postDate: new Date().toLocaleDateString(),
                title,
                image: photo_url,
                description,
                category,
                tags
            }

            await mutateAsync(forumData);
            form.reset();
            setTags([]);

        } catch (error) {
            toast.error(error.message);
        }


    }

    const handleAddTag = () => {
        const tag = document.getElementById("tag").value;
        if (tag) setTags([...tags, tag]);
        document.getElementById("tag").value = '';
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className=" bg-blue-gray-50 shadow-md w-full lg:w-10/12 2xl:w-3/4 p-6 md:p-8 lg:p-10 rounded">
                <form onSubmit={handleSubmit} className="w-full space-y-4 lg:space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                        <Input name="title" type="text" label="Title" className="bg-white" required />
                        <Input name="photo" type="file" label="Photo" className="bg-white " />
                    </div>
                    <div className="grid grid-cols-1">
                        <Input name="category" type="text" label="Category" className="bg-white" required />
                    </div>
                    <div className="grid grid-cols-1">
                        <Textarea name="description" type="text" label="Description" className="bg-white min-h-[180px]" required />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                        <Input id="tag" name="tag" type="text" label="Tag" className="bg-white" />
                        <Button onClick={handleAddTag}>Add Tag</Button>
                    </div>
                    <div className="grid grid-cols-1">
                        <Textarea name="tags" defaultValue={tags} type="text" placeholder="Your tags are here" className="bg-white min-h-[50px]" readOnly />
                    </div>
                    <div className='pt-6 text-right'>
                        <Button type="submit" className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                            <span className="relative text-base">Add Post</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewForum;