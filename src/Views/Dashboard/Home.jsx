import { useOutletContext } from 'react-router-dom';

import { DocumentTitle } from "../../Utilities/DocumentTitle"

const DashbaordPage = () => {
    DocumentTitle("Soft Countries API || Dashboard Page")
    const { userInfo } = useOutletContext();

    return (
        <div>
            <h1>Welcome, {userInfo.username}!</h1>
            {/* Display more user information as needed */}
        </div>
    )
}

export default DashbaordPage