import Select from 'react-select';
import { Button, Input, Textarea } from "@material-tailwind/react";
import Container from "../../../shared/Container/Container";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpiner from "../../../shared/LoadingSpiner/LoadingSpiner";
import { useState } from "react";
import { slot_names } from "../../../../utils/slot_names";
import toast from 'react-hot-toast';
import { days } from '../../../../utils/days';

const AddNewSlot = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionClasses, setSelectedOptionClasses] = useState(null);
    const [classes, setClasses] = useState(null);

    const { user, loading } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: trainer = {}, isLoading } = useQuery({
        queryKey: ['trainer', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/trainer/${user?.email}?email=${user?.email}`);
            setSelectedOption(data.availableDays);
            setSelectedOptionClasses(data.skills);
            return data;
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (newSlot) => {
            const { data } = await axiosSecure.post(`/add-slot?email=${user?.email}`, newSlot);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                toast.success("Slot added successfully");
            } else {
                toast.error("Something went wrong!");
            }
        }
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.slotName.value;
        const time = form.slotTime.value;
        const classDays = selectedOption;
        const classesName = classes;

        if(!name) return toast.error("Select slot name!");
        if(classDays === null || classDays.length === 0) return toast.error("Select class days");
        if(classesName === null || classesName.length === 0) return toast.error("Select classes!");

        const slotData = {
            slotName: name,
            slotTime: time,
            classDays,
            classesName,
            trainer: {
                name: trainer?.name,
                email: trainer?.email,
                id: trainer?._id
            },
            status: 'available'
        }

        try {
            await mutateAsync(slotData);
            form.reset();
        } catch(error) {
            toast.error(error.message);
        }

    }

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="py-8 md:py-12 lg:py-16 min-h-[60vh]">
            <Helmet>
                <title>Add New Slot | Fit Vessel</title>
            </Helmet>
            <Container>
                <div className="flex justify-center items-center">
                    <div className=" bg-blue-gray-50 shadow-md w-full lg:w-10/12 xl:w-3/4 p-6 md:p-8 lg:p-10 rounded">
                        <form onSubmit={handleSubmit} className="w-full space-y-4 lg:space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <Input name="name" defaultValue={trainer?.name} type="text" label="Name" className="bg-white" readOnly />
                                <Input defaultValue={trainer?.email} name="email" type="email" label="Email" className="bg-white disabled:border" readOnly />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <Input defaultValue={trainer?.image} name="photo" type="text" label="Photo URL" className="bg-white" />
                                <Input defaultValue={trainer?.age} name="age" type="number" label="Age" className="bg-white" readOnly />
                            </div>

                            <div>
                                <Textarea defaultValue={trainer?.skills.map(s => s.value)} name="skills" type="text" label="Skills" className="bg-white" />
                            </div>
                            <div>
                                <Input defaultValue={trainer?.availableDays.map((d) => d.value)} name="days" type="text" label="Available Days" className="bg-white" />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <Input defaultValue={trainer?.experience} type="number" label="Experience (Year)" className="bg-white" readOnly />
                                <Input defaultValue={trainer?.classDuration} type="number" label="Class Duration (Hour)" className="bg-white" readOnly />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <Input defaultValue={trainer?.availableTime} type="text" label="Available Time" className="bg-white" readOnly />
                                <Input defaultValue={trainer?.status} type="text" label="Status" className="bg-white" readOnly />
                            </div>
                            <div className="grid grid-cols-1">
                                <Textarea defaultValue={trainer?.biography} name='biography' label="Biography" readOnly />
                            </div>

                            <div className='h-[2px] w-full bg-gray-600'></div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <select name="slotName" className="p-2.5 rounded-lg border-gray-400 border text-gray-700 " defaultValue=''>
                                    <option value='' disabled>Select Slot Name</option>
                                    {
                                        slot_names.map((slot, i) => <option value={slot} key={i}>{slot}</option>)
                                    }
                                </select>
                                <Input name="slotTime" type="number" label="Slot Time (Hour)" className="bg-white" required />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <Select
                                    placeholder='Select Available Days'
                                    defaultValue={selectedOption}
                                    value={selectedOption}
                                    onChange={setSelectedOption}
                                    options={days}
                                    isMulti={true}
                                    className='w-full'
                                />
                                <Select
                                    placeholder='Select Classes'
                                    onChange={setClasses}
                                    defaultValue={classes}
                                    options={selectedOptionClasses}
                                    isMulti={true}
                                    className='w-full'
                                />
                            </div>

                            <div className='pt-6 text-right'>
                                <Button type="submit" className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                    <span className="relative text-base">Submit</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AddNewSlot;