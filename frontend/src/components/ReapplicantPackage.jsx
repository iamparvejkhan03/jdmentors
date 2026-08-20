import { useEffect, useState } from "react";
import { Gift, Plus, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { showAuthForm } from "../features/forms/UserAuthSlice.js";
import useGetAllPackages from "../hooks/useGetAllPackages";

const REAPPLICANT_TITLE = "The Re-Applicant";

function ReapplicantPackage() {
    const [reapp, setReapp] = useState(null);
    const getAllPackages = useGetAllPackages();
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackage = async () => {
            const all = await getAllPackages();
            setReapp(all?.find(p => p.title === REAPPLICANT_TITLE) || null);
        }
        fetchPackage();
    }, [])

    const handleClick = () => {
        try {
            if (!isUserLoggedIn) dispatch(showAuthForm('user'));
            navigate(`/checkout/package/${reapp._id}`);
        } catch (error) {
            console.error(error);
        }
    }

    if (!reapp) return null;

    return (
        <div className="mt-14">
            <h2 className="text-3xl font-semibold text-blue-950 text-center mb-2">Reapplicant Package</h2>
            <p className="text-gray-600 text-center mb-8">Applied before? Approach your next cycle differently.</p>
            <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-lg shadow-teal-200 relative">
                <p className="px-3 py-1 text-xs lg:text-base absolute right-2 top-1 rounded bg-white text-teal-700">Reapplicant Package</p>
                <div className="p-6 flex flex-col bg-gradient-to-b from-[#087F6A] to-[#12A184] text-white">
                    <h3 className="text-2xl font-semibold mb-2">{reapp.title}</h3>
                    <p className="mb-4">{reapp.description}</p>
                    {reapp.services?.length > 0 && (
                        <div>
                            <p className="mb-2 font-semibold">Services:</p>
                            <ul className="space-y-2 mb-4">
                                {reapp.services.map((service) => (
                                    <li key={service} className="flex items-start gap-1">
                                        <Settings className="text-sm mt-1 flex-shrink-0" size={18} />
                                        <span>{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {reapp.addons?.length > 0 && (
                        <div>
                            <p className="mb-2 font-semibold">Add-ons:</p>
                            <ul className="space-y-2 mb-4">
                                {reapp.addons.map((addon) => (
                                    <li key={addon} className="flex items-start gap-1">
                                        <Plus className="text-sm mt-1 flex-shrink-0" size={18} />
                                        <span>{addon}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {reapp.extras?.length > 0 && (
                        <div>
                            <p className="mb-2 font-semibold">Extras:</p>
                            <ul className="space-y-2 mb-4">
                                {reapp.extras.map((extra) => (
                                    <li key={extra} className="flex items-start gap-1">
                                        <Gift className="text-sm mt-1 flex-shrink-0" size={18} />
                                        <span>{extra}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="mt-auto pt-4">
                        <p className="text-3xl font-bold mb-4">${reapp.price}</p>
                        <button onClick={handleClick} className="w-full bg-white text-teal-700 font-semibold py-3 rounded-lg hover:bg-teal-50 transition cursor-pointer">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReapplicantPackage;
