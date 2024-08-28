import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from 'react-router-dom';
import { TbLoader3 } from 'react-icons/tb';

import { DocumentTitle } from "../../Utilities/DocumentTitle"
import { UserDatatable } from "../../Components/Index";
import { GetAllUsers, GetUserDetails } from "../../APIs/admin.api";

const UsersManagementPage = () => {
    DocumentTitle("Soft Countries API || Users Management Page")
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
                const response = await GetAllUsers()
                setData(response.data.data)
            } catch (error) {
                console.error("Error fetching all users", error);
            }
        }
        fetchData()
        setIsLoading(false);
    }, [])



    return (
        <div className='flex flex-col w-full px-4 mt-4 md:px-0 gap-y-6'>
            <div>
                <span className='text-2xl font-bold lg:text-4xl'>User Management Overview</span>
            </div>
                {isLoading && <TbLoader3 size={24} className="animate-spin" />}
                <div>
                    <   UserDatatable data={data} />
                </div>
        </div>
    )
}

export default UsersManagementPage