const GetRecentActivities = ({ data }) => {

    const sortedActivities = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const latestActivities = sortedActivities.slice(0, 5);

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
            case '/v1/User/GetCalls':
                return 'Retrieved calls made';
            case '/v1/User/GetCallsCount':
                return 'Retrieved the count of calls';
            case '/v1/User/SwitchMode':
                return 'Switched between test and live modes';
            case '/v1/User/AddWebsite':
                return 'Added a new website';
            case '/v1/User/RemoveWebsite':
                return 'Removed a website';
            case '/v1/User/GetUserTransactions':
                return 'Retrieved user transactions';
            case '/v1/User/GetUser/:username':
                return ' Retrieved user information by username';
            case '/v1/User/GetUserActivities':
                return 'Retrieved user activities';
            default:
                return url;
        }
    };

    return (
        <div className='flex flex-col w-full p-6 bg-white rounded-lg shadow-lg gap-y-4'>
            <ul className='pl-5 list-disc'>
                {latestActivities.map(activity => (
                    <li className="py-3" key={activity._id}>
                        {mapUrlToText(activity.url)} at  {activity.timestamp}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GetRecentActivities