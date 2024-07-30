import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import { TbLoader3 } from 'react-icons/tb';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

import { DocumentTitle } from "../../Utilities/DocumentTitle";
import { GetCalls, GetCallsCount, GetUserActivities } from "../../APIs/user.api";
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
                label: 'Test Mode',
                data: [
                    { x: 'Total', y: callCounts.testMode?.total || 0 },
                    { x: 'Successful', y: callCounts.testMode?.successful || 0 },
                    { x: 'Failed', y: callCounts.testMode?.failed || 0 },
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Live Mode',
                data: [
                    { x: 'Total', y: callCounts.liveMode?.total || 0 },
                    { x: 'Successful', y: callCounts.liveMode?.successful || 0 },
                    { x: 'Failed', y: callCounts.liveMode?.failed || 0 },
                ],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const isDataEmpty = !callCounts.testMode?.total && !callCounts.liveMode?.total;

    return (
        <div className='flex flex-col w-full px-4 mt-4 md:px-0 gap-y-6'>
            <div>
                <span className='text-2xl font-bold lg:text-4xl'>Statistics Overview</span>
                {isLoading && <TbLoader3 size={24} className="animate-spin" />}
                {!isLoading && isDataEmpty && (
                    <div className="flex flex-col items-center justify-center p-10 gap-y-8">
                        <img src={assets.NoData} alt="" />
                        <h1 className="text-4xl font-medium">Oops! No data available to yet, Make a call to see data.</h1>
                    </div>
                )}
                {!isLoading && !isDataEmpty && (
                    <div>
                        <h2>Call Counts</h2>
                        <div>
                            <Scatter data={scatterData} options={options} />
                        </div>
                        <div>
                            <h2>Call Details</h2>
                            {/* You can add a table or another chart here to display callDetails */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatisticsPage;