import { DocumentTitle } from '../../Utilities/DocumentTitle'

const PricingPage = () => {
    DocumentTitle("Soft Countries API || Pricing Page")

    const subscriptionPlans = {
        freePlan: {
            monthlyRequests: 1000,
            dataTypesAvailable: "Limited to datasets released with version 1.0",
            rateLimit: "5 requests per minute",
            subscriptionCost: {
                monthly: "0.00",
                annualy: "0.00",
            }
        },
        proPlan: {
            monthlyRequests: 10000,
            dataTypesAvailable: "All datasets available",
            rateLimit: "20 requests per minute",
            subscriptionCost: {
                monthly: "999.99",
                annualy: "9,999.99",
            }
        },
        volumePlan: {
            monthlyRequests: 100000,
            dataTypesAvailable: "All datasets available",
            rateLimit: "50 requests per minute",
            subscriptionCost: {
                monthly: "4,999.99",
                annualy: "49,999.99",
            }
        }
    };


    return (
        <section className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-y-2 lg:gap-y-4 ">
                <span className="text-4xl lg:text-6xl text-center font-extrabold text-[#2E2C34]">Pricing Page!</span>
                <span className="text-xl text-[#667085] font-light text-center">This page contains plans that are offered on our platform</span>
            </div>
        </section>
    )
}

export default PricingPage