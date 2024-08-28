import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import { TbLoader3 } from 'react-icons/tb';

import { DocumentTitle } from "../../Utilities/DocumentTitle"
import { UserDatatable } from "../../Components/Index";

const UsersManagementPage = () => {
    DocumentTitle("Soft Countries API || Users Management Page")
    const { userInfo } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    
    return (
        <div className='flex flex-col w-full px-4 mt-4 md:px-0 gap-y-6'>
            <div>
                <span className='text-2xl font-bold lg:text-4xl'>User Management Overview</span>
            </div>

        </div>
    )
}

export default UsersManagementPage