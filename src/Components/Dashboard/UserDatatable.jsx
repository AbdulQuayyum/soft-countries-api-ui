import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { LuListFilter, LuEye } from "react-icons/lu";

import { compareTimestamps } from '../../Utilities/Utilities';

const UserDatatable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterIndex, setFilterIndex] = useState(-1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const filters = [
        // 'createdAt',
        'username',
        'email',
        'accountType',
        'suspended'
    ];

    const filterLabels = {
        // 'createdAt': 'Date Created',
        'email': 'Email Address',
        'username': 'Username',
        'accountType': 'Subscription',
        'suspended': 'Status',
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = () => {
        setFilterIndex((filterIndex + 1) % (filters.length + 1));
        setCurrentPage(1);
    };

    const filterByField = (item) => {
        const term = searchTerm.toLowerCase();

        if (filterIndex !== -1 && filterIndex !== 4) {
            const field = filters[filterIndex];

            switch (field) {
                // case 'createdAt':
                //     return item.createdAt.toLowerCase().includes(term);
                case 'username':
                    return item.username.toLowerCase().includes(term);
                case 'email':
                    return item.email.toLowerCase().includes(term);
                case 'accountType':
                    return item.accountType.toLowerCase().includes(term);
                case 'suspended':
                    return item.suspended.toString().toLowerCase().includes(term);
                default:
                    return true;
            }
        }

        return item.username.toLowerCase().includes(term) ||
            item.email.toLowerCase().includes(term) ||
            item.accountType.toLowerCase().includes(term) ||
            item.suspended.toString.toLowerCase().includes(term)
        // item.createdAt.toLowerCase().includes(term) ||
    };

    const filteredData = data.filter(filterByField);

    const sortedData = filteredData.sort((a, b) => {
        if (filterIndex === -1 || filterIndex === 4) return 0;

        switch (filters[filterIndex]) {
            case 'username':
                return a.username.localeCompare(b.username);
            case 'email':
                return a.email.localeCompare(b.email);
            // case 'createdAt':
            //     return compareTimestamps(a, b);
            case 'accountType':
                return a.accountType.localeCompare(b.accountType);
            case 'suspended':
                return (a.suspended === true ? 1 : 0) - (b.suspended === true ? 1 : 0);
            default:
                return 0;
        }
    });

    // Reverse the sortedData array
    const reversedData = [...sortedData].reverse();

    const currentData = reversedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const isFilterActive = filterIndex !== -1 && filterIndex !== 4;
    const isSearchActive = searchTerm !== "";

    return (
        <div className="w-full">
            <div className="flex flex-col justify-between w-full gap-4 mt-3 mb-8 sm:flex-row">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="px-3 py-2 w-full sm:max-w-[450px] border rounded-lg"
                />
                <button onClick={handleFilterChange} className='border border-[#E3E6ED] px-6 py-2 items-center flex gap-x-2 rounded-lg'>
                    <LuListFilter />
                    <span className='text-sm font-[400] text-[#232A30]'>Filter</span>
                </button>
            </div>
            {(isFilterActive || isSearchActive) && (
                <div className="flex items-center justify-between mb-4">
                    {isFilterActive && (
                        <span className="text-sm font-medium text-[#232A30]">
                            Filtering by: {filterLabels[filters[filterIndex]]}
                            {isSearchActive && <span className="font-normal"> ({searchTerm})</span>}
                        </span>
                    )}
                </div>
            )}
            <div className="w-full overflow-x-auto">
                <table className='min-w-max my-3 lg:min-w-0 w-full table-auto border border-[#E3E6ED] rounded'>
                    <thead>
                        <tr className='grid w-full grid-cols-12 bg-[#F4F5F6]'>
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-2'>Username</td>
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-3'>Email</td>
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-1'>Plan</td>
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-2'>Status</td>
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-3'>Date Created</td>
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-1'></td>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {currentData.map((item, index) => (
                            <tr key={index} className='grid w-full grid-cols-12 border-b border-b-[#E3E6ED]'>
                                <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-2'>
                                    {item.username}
                                </td>
                                <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-3'>
                                    {item.email}
                                </td>
                                <td className='text-sm capitalize font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-1'>
                                    {item.accountType}
                                </td>
                                <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-2'>
                                    <span className={`text-sm font-[400] items-center w-fit flex py-1 rounded-2xl gap-x-2 ${item.suspended ? " text-[#9E1801]" : " text-[#22c55e] "}`} >
                                        <span className={` flex h-2 w-2 rounded-full ${item.suspended ? " bg-[#9E1801]" : " bg-[#22c55e]"}`}></span>
                                        {item.suspended ? "Suspended" : "Active"}
                                    </span>
                                </td>
                                <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-3'>{item.createdAt}</td>
                                <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-1'>
                                    <LuEye />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end my-4 gap-x-4">
                <span>
                    {currentPage} of {totalPages}
                </span>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
                    <FaAngleLeft />
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50" >
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
};

export default UserDatatable;