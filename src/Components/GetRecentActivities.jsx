import { useState, useEffect } from 'react';
import { TbLoader3 } from 'react-icons/tb';

import { compareTimestamps } from "../Utilities/Utilities";

const GetRecentActivities = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [filteredActivities, setFilteredActivities] = useState([]);

    const mapUrlToText = (url) => {
        switch (url) {
            case '/v1/Auth/CreateAccount':
                return 'Created a new account';
            case '/v1/Auth/SignIn':
                return 'Signed in to the account';
            case '/v1/Auth/ForgotPassword':
                return 'Initiated password reset';
            case '/v1/Auth/ResetPassword':
                return 'Reset the account password';
            case '/v1/Auth/VerifyEmail':
                return 'Verified the email address';
            case '/v1/Service/GetService/:type':
                return 'Retrieved service data with rate limiting';
            case '/v1/User/GenerateAPIKeys':
                return 'Generated a new API key';
            case '/v1/User/GetAPIKey':
                return 'Retrieved the API key';
            case '/v1/User/DeleteAPIKey':
                return 'Deleted the API key';
            case '/v1/User/SetAPIKeyExpirationDate':
                return 'Set the expiration date for the API key';
            case '/v1/User/SwitchMode':
                return 'Switched between test and live modes';
            case '/v1/User/AddWebsite':
                return 'Added a new website';
            case '/v1/User/RemoveWebsite':
                return 'Removed a website';
            default:
                return url;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            const filteredData = data.filter(activity => {
                return ![
                    '/v1/User/GetCalls',
                    '/v1/User/GetCallsCount',
                    '/v1/User/GetUserTransactions',
                    '/v1/User/GetUser/:username',
                    '/v1/User/GetUserActivities'
                ].includes(activity.url);
            }).sort(compareTimestamps).slice(0, 9);

            setFilteredActivities(filteredData);
            setLoading(false);
        }, 1000);
    }, [data]);

    return (
        <div className='flex flex-col w-full px-6 py-3 bg-white rounded-lg shadow-lg gap-y-4'>
            {loading ?
                (<TbLoader3 size={24} className="animate-spin" />) : (
                    <ul className='pl-5 list-disc'>
                        {filteredActivities.map(activity => (
                            <li className="py-3" key={activity._id}>
                                {mapUrlToText(activity.url)} at {activity.timestamp}
                            </li>
                        ))}
                    </ul>
                )}
        </div>
    )
}

export default GetRecentActivities;