import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import { TbLoader3 } from 'react-icons/tb';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

import { DocumentTitle } from "../../Utilities/DocumentTitle";
import { GetCalls, GetCallsCount } from "../../APIs/user.api";
import { Datatable } from "../../Components/Index";
import assets from "../../Assets/Index"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const StatisticsPage = () => {
    DocumentTitle("Soft Countries API || Statistics Page");
    const { userInfo } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    const [callCounts, setCallCounts] = useState({});
    const [callDetails, setCallDetails] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const fetchCallCounts = async () => {
            try {
                const data = await GetCallsCount({ username: userInfo.username });
                setCallCounts(data.data.data);
            } catch (error) {
                console.error("Error fetching call counts", error);
            }
        };

        const fetchCalls = async () => {
            try {
                const data = await GetCalls({ username: userInfo.username });
                setCallDetails(data.data.data);
            } catch (error) {
                console.error("Error fetching call details", error);
            }
        };

        fetchCallCounts();
        fetchCalls();
        setIsLoading(false);
    }, [userInfo.username]);

    const scatterData = {
        datasets: [
            {
                label: `Test Mode (Total: ${callCounts.testMode?.total || 0}, Successful: ${callCounts.testMode?.successful || 0}, Failed: ${callCounts.testMode?.failed || 0})`,
                data: [
                    { x: 1, y: callCounts.testMode?.total || 0, label: 'Total' },
                    { x: 2, y: callCounts.testMode?.successful || 0, label: 'Successful' },
                    { x: 3, y: callCounts.testMode?.failed || 0, label: 'Failed' },
                ],
                backgroundColor: '#aaa',
            },
            {
                label: `Live Mode (Total: ${callCounts.liveMode?.total || 0}, Successful: ${callCounts.liveMode?.successful || 0}, Failed: ${callCounts.liveMode?.failed || 0})`,
                data: [
                    { x: 1, y: callCounts.liveMode?.total || 0, label: 'Total' },
                    { x: 2, y: callCounts.liveMode?.successful || 0, label: 'Successful' },
                    { x: 3, y: callCounts.liveMode?.failed || 0, label: 'Failed' },
                ],
                backgroundColor: '#22c55e',
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.raw.label || '';
                        const value = context.raw.y;
                        return `${label}: ${value}`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
            },
        },
    };


    const isDataEmpty = !callCounts.testMode?.total && !callCounts.liveMode?.total;

    return (
        <div className='flex flex-col w-full px-4 mt-4 md:px-0 gap-y-6'>
            <span className='text-2xl font-bold lg:text-4xl'>Statistics Overview</span>
            {isLoading && <TbLoader3 size={24} className="animate-spin" />}
            {isDataEmpty && (
                <div className="flex flex-col items-center justify-center p-10 gap-y-8">
                    <img src={assets.NoData} alt="" />
                    <h1 className="text-2xl font-medium">Oops! No data available to yet, Make a call to see data.</h1>
                </div>
            )}
            {!isDataEmpty && (
                <>
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold ">Call Counts</h2>
                        <div className="w-full h-full  max-h-[500px]">
                            <Scatter data={scatterData} options={options} />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold ">Call Details</h2>
                        <Datatable data={callDetails} />
                    </div>
                </>
            )}
        </div>
    );
};

export default StatisticsPage;