import { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { TbLoader3 } from 'react-icons/tb';
import toast from 'react-hot-toast';

import { DocumentTitle } from "../../Utilities/DocumentTitle"
import { GetUserDetails, SuspendUser } from "../../APIs/admin.api";

const UserDetailsPage = () => {
    DocumentTitle("Soft Countries API || User Detail Page")
    const { UserID } = useParams()
    const { userInfo } = useOutletContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuspended, setIsSuspended] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!userInfo.isAdmin) {
            navigate('/404');
            return;
        }
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await GetUserDetails(UserID)
                setData(response.data.data)
            } catch (error) {
                console.error("Error fetching all users", error);
            }
        }
        fetchData()
        setIsLoading(false);
    }, [])

    useEffect(() => {
        if (data?.suspended) {
            setIsSuspended(true);
        } else {
            setIsSuspended(false);
        }
    }, [data, isSuspended]);

    const HandleSuspend = async () => {
        setIsSuspended((prev) => !prev);
        try {
            await SuspendUser(UserID);
        } catch (error) {
            setIsSuspended((prev) => !prev);
            console.error('Error suspending user:', error);
        }
        setTimeout(() => {
            GetUserDetails(UserID)
        }, 5000);
    }

    const testFailures = data?.calls?.filter(call => call?.success === false && call?.mode === 'test');
    const testSuccesses = data?.calls?.filter(call => call?.success === true && call?.mode === 'test');
    const liveFailures = data?.calls?.filter(call => call?.success === false && call?.mode === 'live');
    const liveSuccesses = data?.calls?.filter(call => call?.success === true && call?.mode === 'live');

    return (
        <div className='flex flex-col w-full mt-4 gap-y-6'>
            {isLoading && <TbLoader3 size={24} className="animate-spin" />}
            <div>
                <span className='text-2xl font-bold lg:text-4xl'>User {data?.username}'s Overview</span>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-between gap-8 items-center md:items-stretch">
                <div className='flex flex-1 flex-col w-full p-6 bg-white rounded-lg shadow-lg gap-y-4'>
                    <div className="flex w-full justify-between items-center gap-6">
                        <span className="text-lg">User's username:</span>
                        <span className="text-lg font-bold">{data?.username}</span>
                    </div>
                    <div className="flex w-full justify-between items-center gap-6">
                        <span className="text-lg">User's email:</span>
                        <span className="text-lg font-bold">{data?.email}</span>
                    </div>
                    <div className="flex w-full justify-between items-center gap-6">
                        <span className="text-lg">User's plan:</span>
                        <span className="text-lg font-bold capitalize">{data?.accountType}</span>
                    </div>
                    <div className="flex w-full justify-between items-center gap-6">
                        <span className="text-lg">User's mode:</span>
                        <span className="text-lg font-bold capitalize">{data?.mode}</span>
                    </div>
                    <div className="flex w-full justify-between items-center gap-6">
                        <span className="text-lg">Is user an admin?</span>
                        <span className="text-lg font-bold">{data?.isAdmin ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex w-full justify-between items-center gap-6">
                        <span className="text-lg">Is user verified?</span>
                        <span className="text-lg font-bold">{data?.emailVerified ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex w-full justify-between items-center gap-6">
                        <span className="text-lg">User's subscription type:</span>
                        <span className="text-lg font-bold">{data?.subscriptionType ? data?.subscriptionType : "None"}</span>
                    </div>
                    <div className="flex w-full justify-between items-center gap-6">
                        <span className="text-lg">User's subscription expiration date:</span>
                        <span className="text-lg font-bold">{data?.subscriptionExpiration ? data?.subscriptionExpiration : "None"}</span>
                    </div>
                </div>
                <div className="flex flex-1 h-full flex-col w-full items-center gap-6">
                    <div className='flex flex-col w-full p-6 bg-white rounded-lg shadow-lg gap-y-4'>
                        <div className="flex items-center justify-between gap-4">
                            <span>Suspend User</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={isSuspended} onChange={HandleSuspend} className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                            </label>
                        </div>
                    </div>
                    <div className='flex h-full flex-col w-full p-6 bg-white rounded-lg shadow-lg gap-y-4'>
                        <span className='text-2xl font-bold lg:text-3xl'>Call Counts</span>
                        <div className="flex w-full justify-between gap-4">
                            <div className="flex flex-col items-start gap-6">
                                <span className="text-xl">Total</span>
                                <div className="flex flex-col">
                                    <div className="flex gap-3 items-center">
                                        <span className=" text-green-500">Live:</span>
                                        <span className="font-bold text-xl">{data.callCount}</span>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span className=" text-gray-600">Test:</span>
                                        <span className="font-bold text-xl">{data.testCallCount}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-6">
                                <span className="text-xl">Successful</span>
                                <div className="flex flex-col">
                                    <div className="flex gap-3 items-center">
                                        <span className=" text-green-500">Live:</span>
                                        <span className="font-bold text-xl">{liveSuccesses?.length}</span>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span className=" text-gray-600">Test:</span>
                                        <span className="font-bold text-xl">{testSuccesses?.length}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-6">
                                <span className="text-xl">Failed</span>
                                <div className="flex flex-col">
                                    <div className="flex gap-3 items-center">
                                        <span className=" text-green-500">Live:</span>
                                        <span className="font-bold text-xl">{liveFailures?.length}</span>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span className=" text-gray-600">Test:</span>
                                        <span className="font-bold text-xl">{testFailures?.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsPage