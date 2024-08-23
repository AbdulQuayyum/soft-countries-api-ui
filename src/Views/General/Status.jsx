import { useEffect, useState } from 'react';
import axios from 'axios';
import { TbLoader3 } from "react-icons/tb";

import { DocumentTitle } from '../../Utilities/DocumentTitle';

const StatusPage = () => {
    DocumentTitle("Soft Countries API || Status Page");

    const [uptimeData, setUptimeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUptimeData = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/v1/Service/GetStatus`);
                setUptimeData(response.data.data);
            } catch (error) {
                console.error('Error fetching uptime data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUptimeData();
    }, []);

    if (loading) return <div className="container flex items-center justify-center p-10"><TbLoader3 size={24} className="animate-spin" /> </div>;

    const { currentStatus, statusColor, uptime } = uptimeData;
    const { last24Hours, last7Days, last30Days, last6Months, lastYear, dailyUptime } = uptime;

    return (
        <section className="flex flex-col items-center justify-center w-full py-12 gap-y-12">
            <div className="flex flex-col items-center justify-center gap-y-2 lg:gap-y-4">
                <span className="text-4xl lg:text-6xl text-center font-extrabold text-[#2E2C34]">Status Page!</span>
                <span className="text-xl text-[#667085] font-light text-center">
                    This page contains information on the status of our Software as a Service, uptimes and downtimes.
                </span>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-y-2 lg:gap-y-4">
                <h1 className="flex items-center text-4xl font-bold gap-x-2">Our service is currently
                    <span className={` ${statusColor === 'green' ? 'text-[#22c55e]' : 'text-red-500'}`}>
                        {currentStatus}
                    </span></h1>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-y-4">
                <h2 className="text-4xl font-bold">Uptime Statistics</h2>
                <div className='flex items-center justify-center p-6 bg-white rounded-lg shadow-lg w-fit gap-x-1'>
                    {dailyUptime.slice(-90).map((item) => (
                        <div key={item.date} className="relative flex items-center justify-center group">
                            <span className={`w-2 h-10 cursor-pointer rounded-2xl ${item.uptime === 100 ? "bg-[#22c55e]" : item.uptime >= 90 ? "bg-green-400" : "bg-yellow-300"}`} />
                            <div className="absolute px-3 py-1 mb-2 text-sm text-white transition-opacity duration-300 bg-black rounded-lg opacity-0 bottom-full w-max group-hover:opacity-100">
                                {`Date: ${item.date}, Uptime: ${item.uptime}%`}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-y-4">
                <h2 className="text-4xl font-bold">Overall Uptime Statistics</h2>
                <div className='flex flex-wrap items-center justify-center w-full p-6 bg-white rounded-lg shadow-lg lg:justify-between gap-x-12'>
                    <div className="flex flex-col items-start p-6 gap-y-3">
                        <p className="text-2xl font-bold">{last24Hours.toFixed(2)}%</p>
                        <h3 className="text-lg font-semibold">Last 24 Hours</h3>
                    </div>
                    <div className="flex flex-col items-start p-6 gap-y-3">
                        <p className="text-2xl font-bold">{last7Days.toFixed(2)}%</p>
                        <h3 className="text-lg font-semibold">Last 7 Days</h3>
                    </div>
                    <div className="flex flex-col items-start p-6 gap-y-3">
                        <p className="text-2xl font-bold">{last30Days.toFixed(2)}%</p>
                        <h3 className="text-lg font-semibold">Last 30 Days</h3>
                    </div>
                    <div className="flex flex-col items-start p-6 gap-y-3">
                        <p className="text-2xl font-bold">{last6Months.toFixed(2)}%</p>
                        <h3 className="text-lg font-semibold">Last 6 Months</h3>
                    </div>
                    <div className="flex flex-col items-start p-6 gap-y-3">
                        <p className="text-2xl font-bold">{lastYear.toFixed(2)}%</p>
                        <h3 className="text-lg font-semibold">Last Year</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatusPage;
