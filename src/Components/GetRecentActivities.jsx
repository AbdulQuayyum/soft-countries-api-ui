import { useState, useEffect } from 'react';
import { TbLoader3 } from 'react-icons/tb';

import { compareTimestamps } from "../Utilities/Utilities";

const GetRecentActivities = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [filteredActivities, setFilteredActivities] = useState([]);

    const mapUrlToText = (url) => {
        const urlMappings = {
            '/v1/Auth/CreateAccount': 'Created a new account',
            '/v1/Auth/SignIn': 'Signed in to the account',
            '/v1/Auth/ForgotPassword': 'Initiated password reset',
            '/v1/Auth/ResetPassword': 'Reset the account password',
            '/v1/Auth/VerifyEmail': 'Verified the email address',
            '/v1/Service/GetService/:type': 'Retrieved service data with rate limiting',
            '/v1/User/GenerateAPIKeys': 'Generated a new API key',
            '/v1/User/GetAPIKey': 'Retrieved the API key',
            '/v1/User/DeleteAPIKey': 'Deleted the API key',
            '/v1/User/SetAPIKeyExpirationDate': 'Set the expiration date for the API key',
            '/v1/User/SwitchMode': 'Switched between test and live modes',
            '/v1/User/AddWebsite': 'Added a new website',
            '/v1/User/RemoveWebsite': 'Removed a website',
            '/v1/Auth/ChangePassword': 'Changed the password'
        };

        const dynamicSegments = [
            '/v1/Service/GetService/',
            '/v1/User/GetUser/',
            '/v1/User/GetUserActivities'
        ];

        if (urlMappings[url]) {
            return urlMappings[url];
        }

        for (const segment of dynamicSegments) {
            if (url.startsWith(segment)) {
                return urlMappings[`${segment}:type`] || url;
            }
        }

        return url;
    };

    const excludeUrls = [
        '/v1/User/GetCalls',
        '/v1/User/GetCallsCount',
        '/v1/User/GetUserTransactions',
        '/v1/User/GetUser/:username',
        '/v1/User/GetUserActivities',
        '/v1/Service/GetService/:type'
    ];

    const filterAndMapActivities = (activities) => {
        return activities.filter(activity => {
            return !excludeUrls.some(excludeUrl => {
                if (excludeUrl.includes(':')) {
                    const [base] = excludeUrl.split(':');
                    return activity.url.startsWith(base);
                }
                return activity.url === excludeUrl;
            });
        }).sort(compareTimestamps).slice(0, 20).map(activity => ({
            ...activity,
            description: mapUrlToText(activity.url)
        }));
    };

    useEffect(() => {
        setTimeout(() => {
            const filteredData = filterAndMapActivities(data);
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