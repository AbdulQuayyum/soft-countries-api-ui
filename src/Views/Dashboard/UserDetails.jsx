import { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { TbLoader3 } from 'react-icons/tb';

import { DocumentTitle } from "../../Utilities/DocumentTitle"
import { GetUserDetails } from "../../APIs/admin.api";

const UserDetailsPage = () => {
    DocumentTitle("Soft Countries API || User Detail Page")
    const { UserID } = useParams()
    const { userInfo } = useOutletContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
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
                console.log(response.data.data)
            } catch (error) {
                console.error("Error fetching all users", error);
            }
        }
        fetchData()
        setIsLoading(false);
    }, [])


    return (
        <div>UserDetails</div>
    )
}

export default UserDetailsPage