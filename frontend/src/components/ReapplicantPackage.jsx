import { useEffect, useState } from "react";
import { CalendarCheck2, Gift, Plus, RefreshCcw, Settings } from "lucide-react";
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

    const services = (reapp.services || []).filter(Boolean);
    const addons = (reapp.addons || []).filter(Boolean);
    const extras = (reapp.extras || []).filter(Boolean);

    return (
        <div className="mt-14">
            <h2 className="text-3xl font-bold text-blue-950">Reapplicant Package</h2>
            <p className="md:text-lg text-blue-950 mt-3 mb-10">Applied before? Approach your next cycle differently.</p>

            <div className="rounded-xl overflow-hidden shadow-lg shadow-teal-200 relative bg-gradient-to-br from-[#054D3F] to-[#12A184] text-white">
                <p className="px-3 py-1 text-xs lg:text-base absolute right-1 md:right-2 top-1 rounded bg-white text-teal-700">Reapplicant Package</p>
                <div className="p-6 lg:p-8 grid lg:grid-cols-[1.1fr_1fr_1fr] gap-x-8 gap-y-4">
                    <div className="lg:col-start-1 lg:row-start-1">
                        <div className="flex items-center mb-4">
                            <div className="relative bg-white p-2.5 rounded-full mr-4 w-10 h-10 flex items-center justify-center">
                                <RefreshCcw className="text-sm mt-1 text-teal-700" size={20} />
                            </div>
                            <h3 className="text-2xl font-semibold">{reapp.title}</h3>
                        </div>
                        <p className="mb-4">{reapp.description}</p>
                    </div>
                    <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
                        {services.length > 0 && (
                            <div>
                                <p className="mb-2 font-semibold">Services:</p>
                                <ul className="space-y-2 mb-4">
                                    {services.map((service) => (
                                        <li key={service} className="flex items-start gap-1">
                                            <Settings className="text-sm mt-1 flex-shrink-0" size={18} />
                                            <span>{service}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2">
                        {addons.length > 0 && (
                            <div>
                                <p className="mb-2 font-semibold">Add-ons:</p>
                                <ul className="space-y-2 mb-4">
                                    {addons.map((addon) => (
                                        <li key={addon} className="flex items-start gap-1">
                                            <Plus className="text-sm mt-1 flex-shrink-0" size={18} />
                                            <span>{addon}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {extras.length > 0 && (
                            <div>
                                <p className="mb-2 font-semibold">Extras:</p>
                                <ul className="space-y-2 mb-4">
                                    {extras.map((extra) => (
                                        <li key={extra} className="flex items-start gap-1">
                                            <Gift className="text-sm mt-1 flex-shrink-0" size={18} />
                                            <span>{extra}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-start-1 lg:row-start-2 self-end">
                        <div className="mt-auto pt-4 border-t border-white/30">
                            <p className="text-lg font-bold">${reapp.price}</p>
                            {reapp.process && <p className="text-sm mt-1">Process: {reapp.process}</p>}
                            <button
                                onClick={handleClick}
                                className="mt-4 w-full flex gap-1 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer bg-white text-teal-700 hover:bg-teal-50"
                            >
                                <CalendarCheck2 size={18} /> Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReapplicantPackage;
