import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { LuListFilter } from "react-icons/lu";

import { compareTimestamps } from '../../Utilities/Utilities';

const Datatable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterIndex, setFilterIndex] = useState(-1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const filters = [
        'timestamp',
        'url',
        'success',
        'serviceName'
    ];

    const filterLabels = {
        'timestamp': 'Date',
        'url': 'URL',
        'success': 'Status',
        'serviceName': 'Service Called'
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

    const formatUrlDescription = (url) => {
        const prefixToRemove = '/v1/Service/GetService/';
        let formattedUrl = url.replace(prefixToRemove, '');
        formattedUrl = formattedUrl
            .replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
        return formattedUrl;
    };

    const filterByField = (item) => {
        const term = searchTerm.toLowerCase();

        if (filterIndex !== -1 && filterIndex !== 4) {
            const field = filters[filterIndex];
            
            switch (field) {
                case 'timestamp':
                    return item.timestamp.toLowerCase().includes(term);
                case 'url':
                    return item.url.toLowerCase().includes(term);
                case 'success':
                    return item.success.toString().toLowerCase().includes(term);
                case 'serviceName':
                    return formatUrlDescription(item.url).toLowerCase().includes(term);
                default:
                    return true;
            }
        }
        
        return item.timestamp.toLowerCase().includes(term) ||
               item.url.toLowerCase().includes(term) ||
               item.success.toString().toLowerCase().includes(term) ||
               formatUrlDescription(item.url).toLowerCase().includes(term);
    };

    const filteredData = data.filter(filterByField);

    const sortedData = filteredData.sort((a, b) => {
        if (filterIndex === -1 || filterIndex === 4) return 0; 

        switch (filters[filterIndex]) {
            case 'url':
                return a.url.localeCompare(b.url);
            case 'timestamp':
                return compareTimestamps(a, b);
            case 'success':
                return (a.success === true ? 1 : 0) - (b.success === true ? 1 : 0);
            case 'serviceName':
                return formatUrlDescription(a.url).localeCompare(formatUrlDescription(b.url));
            default:
                return 0;
        }
    });

    const currentData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-3'>Service Called</td>
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-3'>URL</td>
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-4'>Timestamp</td>
                            <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-2'>Status</td>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {currentData.map((item, index) => (
                            <tr key={index} className='grid w-full grid-cols-12 border-b border-b-[#E3E6ED]'>
                                <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-3'>
                                    {formatUrlDescription(item.url)}
                                </td>
                                <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-3'>
                                    {item.url}
                                </td>
                                <td className='text-sm font-[400] text-[#232A30] items-start flex py-3 px-6 col-span-4'>{item.timestamp}</td>
                                <td className='col-span-2'>
                                    <span className={`text-sm font-[400] items-center w-fit flex py-1 rounded-2xl px-4 gap-x-2 ${item.success ? "text-[#22c55e]" : " text-[#9E1801] "}`} >
                                        <span className={` flex h-2 w-2 rounded-full ${item.success ? "bg-[#22c55e]" : " bg-[#9E1801]"}`}></span>
                                        {item.success ? "Successful" : "Failed"}
                                    </span>
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

export default Datatable;