import Select from 'react-select';
import { Button, Checkbox, Input, Textarea } from "@material-tailwind/react";
import Container from "../../components/shared/Container/Container";
import useAuth from "../../hooks/useAuth";
import { classes } from "../../utils/classes";
import { days } from "../../utils/days";
import { useState } from "react";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const TrainerRequest = () => {

    const axiosSecure = useAxiosSecure();

    const [selectedOption, setSelectedOption] = useState(null);
    const [skillsAr, setSkillsAr] = useState([]);
    const [time1AMPM, setTime1AMPM] = useState("AM");
    const [time2AMPM, setTime2AMPM] = useState("AM");

    const { user } = useAuth();

    const handleCheck = (checked, value) => {
        const exist = skillsAr.includes(value);
        if (!exist && checked) setSkillsAr([...skillsAr, value])
        if (exist && !checked) {
            const idx = skillsAr.indexOf(value);
            skillsAr.splice(idx, 1)
        }
    }

    const { mutateAsync } = useMutation({
        mutationFn: async (newTrainer) => {
            const { data } = await axiosSecure.post(`/trainer-requert?email=${user?.email}`, newTrainer);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                toast.success("Applied successful, please wait for admin approval.");
            } else {
                toast.error(data?.message);
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.photo.value;
        const age = parseInt(form.age.value);
        const skills = skillsAr;
        const availableDays = selectedOption;
        const availableTime = `${form.time1.value}${time1AMPM} - ${form.time2.value}${time2AMPM}`;
        const classDuration = parseFloat(form.duration.value);
        const biography = form.biography.value;
        const experience = parseInt(form.experience.value);
        const status = "pending";

        if(skills.length === 0) return toast.error("Select skills!");
        if(availableDays.length === 0) return toast.error("Select days!");

        const newTrainer = {
            name, email, image, age, skills, availableDays, availableTime, classDuration, biography, experience, status
        }

        try {
            await mutateAsync(newTrainer);
            setSelectedOption(null);
            form.reset();
        } catch (error) {
            setSelectedOption(null);
            form.reset();
            toast.error(error.message);
        }

    }

    return (
        <div className="py-8 md:py-12 lg:py-16 min-h-[60vh]">
            <Container>
                <div className="flex justify-center items-center">
                    <div className=" bg-blue-gray-50 shadow-md w-full lg:w-3/4 xl:w-2/3 p-6 md:p-8 lg:p-10 rounded">
                        <form onSubmit={handleSubmit} className="w-full space-y-4 lg:space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <Input name="name" type="text" label="Name" className="bg-white" defaultValue={user?.displayName} required />
                                <Input name="email" type="email" label="Email" defaultValue={user?.email} className="bg-white disabled:border" readOnly />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <Input name="photo" type="text" label="Photo URL" className="bg-white" defaultValue={user?.photoURL} required />
                                <Input name="age" type="number" label="Age" className="bg-white" required />
                            </div>

                            <div>
                                <small className="ms-3">Skills : </small>
                                <div className="flex gap-x-3 gap-y-1 flex-wrap">
                                    {
                                        classes.map((skill, i) => <Checkbox key={i} onChange={(e) => handleCheck(e.target.checked, e.target.value)} value={skill} label={skill} />)
                                    }
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <Input name="experience" type="number" label="Experience (Year)" className="bg-white" required />
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={days}
                                    isMulti={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                <Input name="duration" type="number" label="Class Duration (Hour)" className="bg-white" required />
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6'>
                                    <Input name="time1" type="number" label="Class Start" className="bg-white" required />
                                    <select onChange={(e) => setTime1AMPM(e.target.value)} className='rounded-lg p-2'>
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                    <Input name="time2" type="number" label="Class End" className="bg-white" required />
                                    <select onChange={(e) => setTime2AMPM(e.target.value)} className='rounded-lg p-2'>
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1">
                                <Textarea name='biography' label="Biography" required />
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

export default TrainerRequest;