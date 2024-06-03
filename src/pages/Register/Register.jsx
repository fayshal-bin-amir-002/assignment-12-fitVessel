import { Input } from "@material-tailwind/react";
import Container from "../../components/shared/Container/Container";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { BiLoaderCircle } from "react-icons/bi";
import { uploadImage } from "../../utils/imageUpload";


const Register = () => {

    const { user, userRegister, userGoogleLogin, updateUserProfile, userLogOut } = useAuth();

    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [processing, setProcessing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setProcessing(true);
        
        const photo_url = await uploadImage(data.photoUrl[0]);
        
        await userRegister(data.email, data.password)
        await updateUserProfile(data.name, photo_url)
            .then(async () => {
                await userLogOut()
                    .then(() => {
                        setProcessing(false);
                        navigate("/login");
                        toast.success("Registration successful.");
                    })
                    .catch((error) => {
                        setProcessing(false);
                        toast.error(error.message);
                    })
            })
            .catch((error) => {
                setProcessing(false);
                toast.error(error.message);
            })

    }

    const handleGoogleLogin = async () => {
        setProcessing(true);
        await userGoogleLogin()
            .then(() => {
                setProcessing(false);
                navigate("/");
                toast.success("Logged in successfully.");
            })
            .catch((error) => {
                setProcessing(false);
                toast.error(error.message);
            })
    }

    if (user) return <Navigate to="/"></Navigate>

    return (
        <Container>
            <Helmet>
                <title>Register | Fit Vessel</title>
            </Helmet>
            <div className="py-16">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="w-full p-8 lg:w-1/2">
                        <p className="text-xl text-gray-600 text-center">Hello, welcome to Fit Vessel</p>
                        <button onClick={handleGoogleLogin} disabled={processing} className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full disabled:cursor-not-allowed">
                            <div className="px-4 py-3">
                                <svg className="h-6 w-6" viewBox="0 0 40 40">
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#FFC107" />
                                    <path
                                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                        fill="#FF3D00" />
                                    <path
                                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                        fill="#4CAF50" />
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#1976D2" />
                                </svg>
                            </div>
                            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
                        </button>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <a href="#" className="text-xs text-center text-gray-500 uppercase">or login with email</a>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <div className="mt-4">
                                <Input {...register("name")} type="text" name="name" variant="standard" label="Name" placeholder="Type your name..." required />
                            </div>
                            <div className="mt-4">
                                <Input {...register("photoUrl")} type="file" name="photoUrl" variant="standard" label="Photo Url" placeholder="Enter your photo Url..." required />
                            </div>
                            <div className="mt-4">
                                <Input {...register("email")} type="email" name="email" variant="standard" label="Email" placeholder="Type your email..." required />
                            </div>
                            <div className="mt-4 relative">
                                <Input {...register("password", { minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/ })} type={showPass ? 'text' : 'password'} name="password" variant="standard" label="Password" placeholder="Type your password..." className="relative" required />
                                <span onClick={() => setShowPass(!showPass)} className=" absolute right-2 top-4 cursor-pointer">{showPass ? < LuEye /> : < LuEyeOff />}</span>
                            </div>
                            {errors.password?.type === 'minLength' && <span className='text-xs text-red-500 mt-1'>Password must be 6 characters.</span>}
                            {errors.password?.type === 'pattern' && <span className='text-xs text-red-500 mt-1'>Password must contain one digit, uppercase, lowercase and special character!</span>}
                            <div className="mt-8">
                                <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#DC5F00] text-[#DC5F00] w-full disabled:cursor-not-allowed" disabled={processing}>
                                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#DC5F00] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                    <span className="relative text-[#DC5F00] transition duration-300 group-hover:text-white ease">{processing ? <BiLoaderCircle className=" animate-spin mx-auto text-lg" /> : 'Register'}</span>
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 flex items-center justify-between">
                            <small>Already an account? <Link to="/login" className="font-medium text-[#DC5F00] cursor-pointer hover:underline">Login</Link></small>
                        </div>
                    </div>
                    <div className="hidden lg:block lg:w-1/2 bg-cover"
                        style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTfR09geBGk8WIOzXCbPJ7RqBoTfDbOidmRQ&s')" }}>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Register;