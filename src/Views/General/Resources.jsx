import { useState } from 'react';
import Select from 'react-select'
import { Link, scroller } from 'react-scroll';
import { useNavigate } from "react-router-dom"
import { CopyBlock, monoBlue } from 'react-code-blocks';

import { DocumentTitle } from '../../Utilities/DocumentTitle'
import { customStyles02, replaceSpacingWithHyphen } from "../../Utilities/Utilities";
import { sections, countryDatasetsv1, countryDatasetsv2, steps, responseData, integrationExamplesData, integrationExamplesList } from '../../Data/Data';

const ResourcesPage = () => {
    DocumentTitle("Soft Countries API || Resources Page")
    const navigate = useNavigate()

    const [selectedOption, setSelectedOption] = useState(sections[0]);
    const [selectedLanguage, setSelectedLanguage] = useState(integrationExamplesList[0]);

    const HandleSelectChange = (id) => {
        scroller.scrollTo(id, {
            duration: 500,
            delay: 10,
            smooth: 'easeInQuint',
            offset: -150,
        });
    }

    const HandleSelectedOption = (item) => {
        const id = replaceSpacingWithHyphen(item.Heading);
        HandleSelectChange(id);
        setSelectedOption(item);
    }

    const HandleSelectedLanguage = (selectedLanguage) => {
        setSelectedLanguage(selectedLanguage);
    };

    return (
        <section className="flex flex-col items-center justify-center w-full py-12 gap-y-12">
            <div className="flex flex-col items-center justify-center gap-y-2 lg:gap-y-4 ">
                <span className="text-4xl lg:text-6xl text-center font-extrabold text-[#2E2C34]">Resources Page!</span>
                <span className="text-xl text-[#667085] font-light text-center">This page contains resources that would help you understand out API Service better</span>
            </div>
            <div className="container flex flex-col items-start justify-between gap-20 pt-4 lg:flex-row">
                <div className="max-w-[278px] hidden lg:block w-full sticky z-10 top-40 rounded-xl h-auto ">
                    <h4 className=" text-lg font-bold uppercase text-[#2E2C34]">Content Outline</h4>
                    <ol className="flex flex-col w-full gap-4 py-6 text-lg tracking-wide rounded-md">
                        {sections?.map((item, index) => {
                            return (
                                <li className='cursor-pointer ' key={index}>
                                    <Link
                                        spy={true}
                                        smooth={true}
                                        offset={-150}
                                        duration={500}
                                        delay={10}
                                        isDynamic={true}
                                        ignoreCancelEvents={false}
                                        to={item.id}
                                        activeStyle={{ backgroundColor: "#f8f8f8", borderColor: "#2E2C34" }}
                                        className="pl-4 pr-6 text-[#2E2C34] text-[17px] block cursor-pointer w-full border-l-2 py-1 px-4 font-medium bg-transparent border-transparent">{item.Heading}</Link>
                                </li>
                            )
                        })}
                    </ol>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(5px)" }} className='block sticky top-24 sm:top-20 py-5 z-[10] lg:hidden w-full'>
                    <Select
                        isSearchable
                        value={sections.find(option => option.Heading === selectedOption)}
                        options={sections}
                        styles={customStyles02}
                        placeholder='Select option...'
                        getOptionLabel={(sections) => sections.Heading}
                        getOptionValue={(sections) => replaceSpacingWithHyphen(sections.Heading)}
                        onChange={HandleSelectedOption}
                    />
                </div>
                <section className="w-full ml-0 custom-div">
                    <section id='introduction'>
                        <h3 className='heading'>Welcome to the Soft Countries API!</h3>
                        <div className='flex flex-col gap-y-2'>
                            <div className="subsection">
                                <span>The Soft Countries API is a powerful and flexible API service that provides comprehensive datasets related to countries. You can access information such as flags, codes, capitals, continents, and more.</span>
                            </div>
                            <div className="subsection">
                                <span>This page should provide all the necessary information to get started with the Soft Countries API and make the most out of its functionalities.</span>
                            </div>
                        </div>
                    </section>
                    <section id='getstarted'>
                        <h3 className='heading'>How to get started with Soft Countries API?</h3>
                        <div className="subsection">
                            <ul className='!list-disc pl-5 !mb-4'>
                                {steps.map((step, index) => (
                                    <li key={index} className='gap-x-1'>
                                        <b className='pr-1 font-bold'>{step.title}:</b>{step.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    <section id='endpoints'>
                        <h3 className='heading'>Get to know Soft Countries API available endpoints!</h3>
                        <div className='flex flex-col gap-y-2'>
                            <div className="subsection">
                                <span>Soft Countries API comes with a number of country-related datasets.  </span>
                            </div>
                            <div className="subsection">
                                <span>Please note, not all endpoints are available on the basic subscription only v1 would be available on the basic plan   </span>
                            </div>
                            <div className='flex flex-col mt-3 gap-y-2'>
                                <div className="subsection">
                                    <span>Here are the different types of data you can fetch using the API: </span>
                                </div>
                                <div className='flex flex-col gap-y-4'>
                                    <h6 className='mt-3 font-bold'>v1 endpoints</h6>
                                    <ul className='!list-disc pl-5 !mb-4'>
                                        {Object.keys(countryDatasetsv1).map(key => (
                                            <li key={key} className='py-2 gap-x-1'>
                                                <b className='pr-1 font-bold '>{key}:</b>{countryDatasetsv1[key].description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='flex flex-col gap-y-4'>
                                    <h6 className='mt-3 font-bold'>v2 endpoints</h6>
                                    <ul className='!list-disc pl-5 !mb-4'>
                                        {Object.keys(countryDatasetsv2).map(key => (
                                            <li key={key} className='py-2 gap-x-1'>
                                                <b className='pr-1 font-bold '>{key}:</b>{countryDatasetsv2[key].description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id='integration'>
                        <h3 className='heading'>How to integrate Soft Countries API endpoints?</h3>
                        <div className='flex flex-col gap-y-2'>
                            <div className="subsection">
                                <span>Below are examples of how to integrate the endpoint using different programming languages. These examples demonstrate how to authenticate and fetch data from the API.</span>
                            </div>
                            <div className="flex flex-col w-full gap-y-4">
                                <div className='flex justify-end w-full'>
                                    <Select
                                        isSearchable
                                        value={selectedLanguage}
                                        options={integrationExamplesList}
                                        styles={customStyles02}
                                        placeholder='Select option...'
                                        getOptionLabel={(option) => option.Heading}
                                        getOptionValue={(option) => replaceSpacingWithHyphen(option.Heading)}
                                        onChange={HandleSelectedLanguage}
                                    />
                                </div>
                                {selectedLanguage && (
                                    <CopyBlock
                                        text={integrationExamplesData[selectedLanguage.id]}
                                        language={selectedLanguage.language}
                                        showLineNumbers={false}
                                        customStyle={{ padding: "12px", borderRadius: "8px" }}
                                        theme={monoBlue}
                                        copied={false}
                                        wrapLines={true}
                                        codeBlock={true}
                                    />
                                )}
                            </div>
                            <div className="subsection">
                                <span>
                                    These examples should help you get started with integrating the Soft Countries API into your application using different programming languages. If you need further assistance, don't hesitate to reach out to our support team.
                                </span>
                            </div>
                        </div>
                    </section>
                    <section id='responses'>
                        <h3 className='heading'>Get familiar with the responses of Soft Countries API endpoints!</h3>
                        <div className="subsection">
                            {Object.keys(responseData).map((key) => (
                                <div key={key} className='flex flex-col py-4 gap-y-4 lg:max-w-2xl xl:max-w-4xl'>
                                    <p className='text-lg font-extrabold'>{key}:</p>
                                    <div>
                                        <CopyBlock
                                            text={JSON.stringify(responseData[key], null, 2)}
                                            language="jsx"
                                            showLineNumbers={false}
                                            customStyle={{ padding: "12px 24px", borderRadius: "8px" }}
                                            theme={monoBlue}
                                            copied={false}
                                            wrapLines={true}
                                            codeBlock={true}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section id='error'>
                        <h3 className='heading'>Understand the errors of Soft Countries API endpoints!</h3>
                        <div className="subsection">
                            <span>The API provides meaningful error messages to help you understand what went wrong. Here are some common errors:</span>
                        </div>
                        <ul className='!list-disc pl-5 !mb-4'>
                            <li className='py-2 gap-x-1'>
                                <span className='block font-bold '>400 Bad Request:</span>
                                <div className='flex flex-col mt-2 gap-y-1'>
                                    <span>Your request is missing either or both Username, API key in the headers</span>
                                    <span>Your request is missing the :type parameter</span>
                                </div>
                            </li>
                            <li className='py-2 gap-x-1'>
                                <span className='block font-bold '>401 Unauthorized:</span>
                                <div className='flex flex-col mt-2 gap-y-1'>
                                    <span>Your request has an invalid username or API key</span>
                                    <span>Your request has an expired API key</span>
                                </div>
                            </li>
                            <li className='py-2 gap-x-1'>
                                <span className='block font-bold '>403 Forbidden: </span>
                                <div className='flex flex-col mt-2 gap-y-1'>
                                    <span>Your subscription has expired for pro or voulme subscribers</span>
                                    <span>You are in test mode but trying to make requests on live domains</span>
                                    <span>Your website domain is not added to to the allowed website list</span>
                                    <span>Your monthly test call limit has been exceeded</span>
                                </div>
                            </li>
                            <li className='py-2 gap-x-1'>
                                <span className='block font-bold '>404 Not Found:</span>
                                <div className='flex flex-col mt-2 gap-y-1'>
                                    <span>The requested data type does not exist. make a request on pur contact us page</span>
                                </div>
                            </li>
                            <li className='py-2 gap-x-1'>
                                <span className='block font-bold '>500 Internal Server Error:</span>
                                <div className='flex flex-col mt-2 gap-y-1'>
                                    <span>An error occurred on the server.</span>
                                </div>
                            </li>
                        </ul>
                        <div className="subsection">
                            <span>The error you are facing is not one of those above? Contact us!!!</span>
                        </div>
                    </section>
                </section>
            </div>
            <div className='mb-6'>
                <button onClick={() => { navigate('/ContactUs') }} className='items-center px-6 flex cursor-pointer py-2.5 border border-[#2E2C34] rounded-lg'>
                    Go to our Contact Us page
                </button>
            </div>
        </section>
    )
}

export default ResourcesPage