import React, { useState, useEffect } from 'react';

import { FetchUserFlag } from '../APIs/request.api';

const Hero = () => {
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageList, setImageList] = useState([]);
    const [currentName, setCurrentName] = useState('');
    const [position, setPosition] = useState('');

    const FetchData = async () => {
        try {
            const response = await FetchUserFlag();
            setImageList(response.data);

            const randomIndex = Math.floor(Math.random() * response.data.length);
            setCurrentImageIndex(randomIndex);
            setCurrentName(response.data[randomIndex]?.name || '');

            const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
            const randomPosition = positions[Math.floor(Math.random() * positions.length)];
            setPosition(randomPosition);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     FetchData();
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * imageList.length);
            setCurrentImageIndex(randomIndex);
            setCurrentName(imageList[randomIndex]?.name || '');

            const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
            const randomPosition = positions[Math.floor(Math.random() * positions.length)];
            setPosition(randomPosition);
        }, 10000);

        return () => clearInterval(interval);
    }, [imageList]);

    const currentImageUrl = imageList[currentImageIndex]?.flag;

    return (
        <div className='flex flex-col-reverse items-center justify-between w-full py-10 sm:py-10 gap-x-10 lg:gap-x-20 lg:flex-row'>
            <div className="flex flex-col items-center justify-center max-w-xl lg:items-start gap-y-2 lg:gap-y-4 ">
                <span className="text-4xl lg:text-6xl text-center lg:text-left py-6 font-extrabold text-[#2E2C34]" >Welcome to the Soft Countries API! </span>
                <span className="text-xl font-bold text-center text-[#667085] lg:text-left">This API Service provides various datasets related to countries, including flags, codes, capitals, continents, and more. </span>
            </div>
            <div className='hero-img' style={{ backgroundImage: `url(${currentImageUrl})` }}>
                <span className={`country-name ${position}`}>{currentName}</span>
            </div>
        </div>
    )
}

export default Hero