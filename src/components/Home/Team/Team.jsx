import Container from "../../shared/Container/Container";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";

const Team = () => {
    return (
        <div className="my-12 md:my-16 lg:my-20 xl:my-24">
            <Container>
                <SectionHeader title="Meet Our Expert Team" description={"Our team of dedicated fitness professionals is here to guide you on your fitness journey. With diverse expertise in personal training, nutrition, and wellness, we're committed to helping you achieve your health and fitness goals."}></SectionHeader>
                <div className="grid gap-6 lg:gap-10 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">

                    <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0">
                        <div id="profile"
                            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                            <div className="p-4 md:p-6 lg:p-8 text-center lg:text-left">
                                <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

                                <h1 className="text-2xl font-semibold pt-8 lg:pt-0">Your Name</h1>
                                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                                    hat you do
                                </p>
                                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                                    good
                                </p>
                                <p className="pt-8 text-sm">Totally optional short description about yourself, what you do and so on.</p>

                            </div>
                        </div>
                        <div className="w-full lg:w-2/5">
                            <img src="https://source.unsplash.com/MP0IUfwrn0A" className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
                        </div>
                    </div>

                    <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0">
                        <div id="profile"
                            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                            <div className="p-4 md:p-6 lg:p-8 text-center lg:text-left">
                                <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

                                <h1 className="text-2xl font-semibold pt-8 lg:pt-0">Your Name</h1>
                                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                                    hat you do
                                </p>
                                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                                    good
                                </p>
                                <p className="pt-8 text-sm">Totally optional short description about yourself, what you do and so on.</p>

                            </div>
                        </div>
                        <div className="w-full lg:w-2/5">
                            <img src="https://source.unsplash.com/MP0IUfwrn0A" className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
                        </div>
                    </div>

                    <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0">
                        <div id="profile"
                            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                            <div className="p-4 md:p-6 lg:p-8 text-center lg:text-left">
                                <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

                                <h1 className="text-2xl font-semibold pt-8 lg:pt-0">Your Name</h1>
                                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                                    hat you do
                                </p>
                                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                                    good
                                </p>
                                <p className="pt-8 text-sm">Totally optional short description about yourself, what you do and so on.</p>

                            </div>
                        </div>
                        <div className="w-full lg:w-2/5">
                            <img src="https://source.unsplash.com/MP0IUfwrn0A" className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default Team;