import { useState } from "react";
import { useNavigate } from "react-router-dom"

import { DocumentTitle } from '../../Utilities/DocumentTitle'
import { Accordion } from "../../Components/Index"

const FAQPage = () => {
    DocumentTitle("Soft Countries API || FAQ Page")
    const navigate = useNavigate()
    const [accordions, setAccordions] = useState([
        {
            title: "General Questions",
            questions: [
                {
                    Q: "What is the Soft Countries API?",
                    A: "The Soft Countries API provides various datasets related to countries, including flags, codes, capitals, continents, and more. It is built using Express.js and serves JSON data dynamically based on the type specified by the user."
                },
                {
                    Q: "How do I sign up for the Soft Countries API?",
                    A: "You can sign up by visiting our website and creating an account. Once registered, you will receive an API key that you can use to access the API."
                },
                {
                    Q: "What types of data can I retrieve using the Soft Countries API?",
                    A: "You can retrieve data such as country names, codes, flags, capitals, continents, states, and more. A full list of available data types is provided in our documentation."
                }
            ]
        },
        {
            title: "Authentication and API Key",
            questions: [
                {
                    Q: "How do I generate an API key?",
                    A: "After creating an account, you can generate an API key from your dashboard. This key is required for authenticating your requests to the API."
                },
                {
                    Q: "Can I regenerate my API key?",
                    A: "Yes, you can regenerate your API key from your dashboard. Note that regenerating your API key will invalidate the old key, so you will need to update your applications with the new key."
                },
                {
                    Q: "How do I keep my API key secure?",
                    A: "Treat your API key like a password. Do not share it publicly or hard-code it into your applications. Store it securely in environment variables or use secret management tools."
                },
                {
                    Q: "What should I do if my API key is compromised?",
                    A: "If you believe your API key has been compromised, regenerate it immediately from your dashboard and update your applications with the new key."
                }
            ]
        },
        {
            title: "Usage and Rate Limits",
            questions: [
                {
                    Q: "Are there any rate limits for the API?",
                    A: "Yes, we have rate limits to ensure fair usage of the API. The limits vary based on your subscription plan. You can find detailed information about the limits in our documentation."
                },
                {
                    Q: "What happens if I exceed my rate limit?",
                    A: "If you exceed your rate limit, you will receive a 429 Too Many Requests response. You will need to wait until your limit resets or upgrade your subscription plan for higher limits."
                },
                {
                    Q: "Can I track my API usage?",
                    A: "Yes, you can track your API usage from your dashboard. It provides detailed information about the number of requests made and the remaining quota for the current billing cycle."
                }
            ]
        },
        {
            title: "Data and Endpoints",
            questions: [
                {
                    Q: "What endpoints are available in the Soft Countries API?",
                    A: "The primary endpoint is POST /v1/Service/GetService/:type, where :type is replaced with the specific type of data you want to fetch. A full list of data types and their descriptions is provided in our documentation."
                },
                {
                    Q: "Can I fetch data for a specific country?",
                    A: "Yes, you can fetch data for specific countries by using the appropriate data type in the endpoint. For example, to get data for African countries, you would use africa-countries."
                },
                {
                    Q: "What data formats are supported by the API?",
                    A: "The API returns data in JSON format. This ensures compatibility with most modern programming languages and frameworks."
                }
            ]
        },
        {
            title: "Error Handling",
            questions: [
                {
                    Q: "What should I do if I receive an error response?",
                    A: "If you receive an error response, check the status code and the error message provided. Common status codes include 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), and 500 (Internal Server Error). Refer to our documentation for detailed explanations of these errors and how to resolve them."
                },
                {
                    Q: "How do I handle API errors in my application?",
                    A: "You should implement proper error handling in your application to manage API errors gracefully. This includes checking the status code, logging the error, and providing meaningful feedback to the user."
                }
            ]
        },
        {
            title: "Subscription and Billing",
            questions: [
                {
                    Q: "What subscription plans are available?",
                    A: "We offer several subscription plans to suit different needs, including free, pro, and volume plans. Each plan comes with different features and usage limits. You can find detailed information about the plans on our pricing page."
                },
                {
                    Q: "How do I upgrade or downgrade my subscription plan?",
                    A: "You can upgrade or downgrade your subscription plan from your dashboard. Changes to your plan will take effect immediately."
                },
                {
                    Q: "What payment methods are accepted?",
                    A: "We accept various payment methods. You can manage your payment methods and billing information from your dashboard."
                },
                {
                    Q: "Can I get a refund if I cancel my subscription?",
                    A: "Refunds are handled on a case-by-case basis. Please contact our support team for assistance with refund requests."
                },
                {
                    Q: "What happens if I exceed my monthly request limit?",
                    A: "If you exceed your monthly request limit, you will receive a 429 Too Many Requests response. To avoid interruptions, consider upgrading your plan for higher limits."
                },
                {
                    Q: "How is billing handled for annual subscriptions?",
                    A: "Annual subscriptions are billed once per year at a discounted rate compared to monthly subscriptions."
                },
                {
                    Q: "Can I get a refund if I cancel my subscription?",
                    A: "Refunds are handled on a case-by-case basis. Please contact our support team for assistance with refund requests."
                },
            ]
        },
        {
            title: "Security and Compliance",
            questions: [
                {
                    Q: "How is my data secured?",
                    A: "We take data security seriously and implement industry-standard security measures to protect your data. This includes encryption, secure access controls, and regular security audits."
                },
                {
                    Q: "Is the Soft Countries API compliant with data protection regulations?",
                    A: "Yes, we comply with relevant data protection regulations, including GDPR. We are committed to protecting your privacy and ensuring that your data is handled responsibly."
                },
                {
                    Q: "Can I access my data history?",
                    A: "Yes, you can access your data history from your dashboard. This includes details about your API usage and any changes made to your account."
                }
            ]
        },
        {
            title: "Support and Troubleshooting",
            questions: [
                {
                    Q: "How can I contact support?",
                    A: "You can contact our support team via email at alaoabdulquayyum@gmail.com. We also provide a contact form on our website for submitting support requests."
                },
                {
                    Q: "What should I do if I encounter an issue with the API?",
                    A: "If you encounter an issue with the API, check our status page for any ongoing incidents. If the issue persists, contact our support team with detailed information about the problem, including any error messages and the steps to reproduce the issue."
                }
            ]
        }
    ]);

    const toggleAccordion = (sectionTitle, questionIndex) => {
        const updatedAccordions = accordions.map((section) => {
            if (section.title === sectionTitle) {
                const updatedQuestions = section.questions.map((question, index) => {
                    if (index === questionIndex) {
                        return { ...question, isOpen: !question.isOpen };
                    } else {
                        return { ...question, isOpen: false };
                    }
                });

                return { ...section, questions: updatedQuestions };
            } else {
                return section;
            }
        });

        setAccordions(updatedAccordions);
    };

    return (
        <section className="flex flex-col items-center justify-center w-full max-w-3xl py-12 gap-y-10">
            <div className="flex flex-col items-center justify-center gap-y-2 lg:gap-y-4 ">
                <span className="text-4xl lg:text-6xl text-center font-extrabold text-[#2E2C34]">FAQ Page!</span>
                <span className="text-xl text-[#667085] font-light text-center">This page contains frequently asked questions that would help you understand out API Service better</span>
            </div>
            <div className="flex flex-col w-full gap-y-12">
                {accordions.map((section) => (
                    <div key={section.title} className="flex flex-col items-start w-full gap-y-4">
                        <h2 className="text-lg lg:text-2xl text-center font-extrabold text-[#2E2C34]">{section.title}</h2>
                        {section.questions.map((question, index) => (
                            <Accordion
                                key={index}
                                title={question.Q}
                                data={question.A}
                                isOpen={question.isOpen || false}
                                toggleAccordion={() => toggleAccordion(section.title, index)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className=''>
                <button onClick={() => { navigate('/Resources') }} className='items-center px-6 flex cursor-pointer py-2.5 border border-[#2E2C34] rounded-lg'>
                    Go to our resources page
                </button>
            </div>
        </section>
    )
}

export default FAQPage