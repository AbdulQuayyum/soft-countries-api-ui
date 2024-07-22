import { useState, useEffect, useRef } from "react"

import { DocumentTitle } from "../../Utilities/DocumentTitle"

const SettingsPage = () => {
    DocumentTitle("Soft Countries API || Settings Page")
    const [tab, setTab] = useState("Security");
    const underlineRef = useRef(null);
    const tabsRef = useRef([]);

    useEffect(() => {
        const activeTab = tabsRef.current.find(t => t.getAttribute('data-tab') === tab);
        if (activeTab && underlineRef.current) {
            underlineRef.current.style.width = `${activeTab.offsetWidth}px`;
            underlineRef.current.style.left = `${activeTab.offsetLeft}px`;
        }
    }, [tab]);

    return (
        <div className='flex flex-col w-full px-4 mt-4 gap-y-6'>
            <div>
                <span className='text-2xl font-bold lg:text-4xl'>Settings Overview</span>
            </div>
            <div className="flex flex-col items-start gap-y-6">
                <div className="relative flex items-center justify-start w-full py-0 m-0 border-b-2 border-b-[#e5e7eb] gap-x-12">
                    <span ref={underlineRef} className="absolute bottom-0 h-[2px] -mb-[2px] bg-black transition-all duration-300" style={{ left: 0, width: 0 }}  ></span>
                    {['Security', 'API Management', 'Accessibility'].map((item, index) => (
                        <span
                            key={item}
                            ref={el => tabsRef.current[index] = el}
                            data-tab={item}
                            onClick={() => setTab(item)}
                            className={`font-bold text-xl cursor-pointer py-3 ${tab === item ? "text-black" : "text-[#aaa]"}`} >
                            {item}
                        </span>
                    ))}
                </div>
                {tab === "Security" &&
                    <div>
                        <span>Security</span>
                    </div>
                }
                {tab === "API Management" &&
                    <div>
                        <span>API Management</span>
                    </div>
                }
                {tab === "Accessibility" &&
                    <div>
                        <span>Accessibility</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default SettingsPage