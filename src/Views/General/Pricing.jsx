import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { DocumentTitle } from '../../Utilities/DocumentTitle';

const PricingPage = () => {
    DocumentTitle("Soft Countries API || Pricing Page");
    const navigate = useNavigate()
    const { user, setShowModal } = useOutletContext();
    const [tab, setTab] = useState("monthly");

    const subscriptionPlans = [
        {
            name: "Basic Plan",
            desc: "A plan for developers looking for country-related dataset for a mini project.",
            subscriptionCost: { monthly: "0.00", annual: "0.00" },
            features: [
                { name: "Allowed Websites", value: 1 },
                { name: "Monthly Requests", value: "1,000" },
                { name: "Data Types Available", value: "Limited to datasets released with version 1.0" },
                { name: "Rate Limit", value: "5 requests per minute" }
            ]
        },
        {
            name: "Pro Plan",
            desc: "For developers requiring extensive data for large projects.",
            subscriptionCost: { monthly: "999.99", annual: "8,499.99 " },
            features: [
                { name: "Allowed Websites", value: 3 },
                { name: "Monthly Requests", value: "10,000" },
                { name: "Data Types Available", value: "All datasets available" },
                { name: "Rate Limit", value: "20 requests per minute" }
            ]
        },
        {
            name: "Volume Plan",
            desc: "Ideal for businesses needing large volumes of data.",
            subscriptionCost: { monthly: "4,999.99", annual: "42,499.99 " },
            features: [
                { name: "Allowed Websites", value: 10 },
                { name: "Monthly Requests", value: "100,000" },
                { name: "Data Types Available", value: "All datasets available" },
                { name: "Rate Limit", value: "50 requests per minute" }
            ]
        }
    ];

    const handleSubscribe = (planType, subscriptionType, amount) => {
        if (user) {
            if (planType.toLowerCase() === 'basic') {
                toast("No payment needed for the Basic plan.")
                navigate('/Dashboard');
                return;
            }

            const handler = PaystackPop.setup({
                key: import.meta.env.VITE_PAYSTACK_PUBLIC,
                email: user.email,
                amount: amount * 100, // Paystack works with kobo, hence multiplying by 100 to convert to kobo
                currency: 'NGN',
                callback: async function (response) {
                    const reference = response.reference;
                    try {
                        const verifyResponse = await axios.post('/api/verify-payment', {
                            reference,
                            subscriptionType,
                            userId: user._id,
                            planType
                        });

                        if (verifyResponse.data.success) {
                            toast.success('Payment successful! Your account has been upgraded.!')
                        } else {
                            toast.error("Payment verification failed.")
                        }
                    } catch (error) {
                        toast.error("An error occurred while verifying payment.")
                        console.error('Error verifying payment:', error);
                    }
                },
                onClose: function () {
                    toast("Payment window closed.")
                }
            });
            handler.openIframe();
        } else {
            setShowModal(true);
        }
        console.log(planType, subscriptionType, amount)
    };

    return (
        <section className="flex flex-col items-center justify-center w-full py-12 gap-y-12">
            <div className="flex flex-col items-center justify-center gap-y-2 lg:gap-y-4">
                <span className="text-4xl lg:text-6xl text-center font-extrabold text-[#2E2C34]">Pricing Page!</span>
                <span className="text-xl text-[#667085] font-light text-center">This page contains plans that are offered on our platform</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-8">
                <div className='flex items-center justify-center px-3 py-2 transition-all duration-150 bg-white rounded-lg w-fit'>
                    <span
                        onClick={() => { setTab("monthly") }}
                        className={`cursor-pointer items-center px-6 py-2 font-bold rounded-lg ${tab === "monthly" ? 'text-[#2E2C34] bg-[#ecebeb]' : 'text-[#667085]'}`}>
                        Monthly Billing
                    </span>
                    <span
                        onClick={() => { setTab("annual") }}
                        className={`cursor-pointer items-center px-6 py-2 font-bold rounded-lg ${tab === "annual" ? 'text-[#2E2C34] bg-[#ecebeb]' : 'text-[#667085]'}`}>
                        Annual Billing
                    </span>
                </div>
                <div className="flex flex-col items-center w-full gap-8 lg:items-stretch lg:flex-row">
                    {subscriptionPlans.map((plan) => (
                        <div key={plan.name} className="relative flex-1 w-full px-6 py-12 bg-white rounded-lg shadow-lg">
                            {(tab === "annual" && (plan.name.toLowerCase().split(' ')[0] != "basic")) &&
                                <div className='absolute top-0 right-0 mt-3'>
                                    <span className="items-center px-6 py-2.5 text-green-500">
                                        15% Discount
                                    </span>
                                </div>
                            }
                            <h3 className="text-4xl font-semibold text-[#2E2C34]">{plan.name}</h3>
                            <p className="text-base text-[#667085] mt-2">{plan.desc}</p>
                            <span className='flex py-5 text-xl font-bold lg:text-5xl'>₦{plan.subscriptionCost[tab]}</span>
                            <ul className="mb-8 flex flex-col gap-y-4 text-[#667085]">
                                {plan.features.map((feature, index) => (
                                    <li key={index}>
                                        <strong className='text-[#2E2C34]'>{feature.name}:</strong> {feature.value}
                                    </li>
                                ))}
                            </ul>
                            <div className='absolute bottom-0 right-0 mb-4 mr-4'>
                                <button onClick={() => handleSubscribe(plan.name.toLowerCase().split(' ')[0], tab, parseFloat(plan.subscriptionCost[tab].replace(',', '')))} className="items-center px-6 py-2.5 border border-[#2E2C34] rounded-lg">
                                    Try {plan.name}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PricingPage;
