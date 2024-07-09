import { useState, useRef } from 'react'
import Select from 'react-select'
import emailjs from '@emailjs/browser'
import cogoToast from 'cogo-toast'

import { customStyles } from '../../Utilities/Utilities'
import { UseForm, Validate } from "../../Utilities/Validations/Index"

const ContactUsPage = () => {
    const form = useRef()

    const feedbackData = [
        { category: "General Feedback" },
        { category: "Feature Requests" },
        { category: "Bug Reports" },
        { category: "User Interface and Design" },
        { category: "Documentation and Resources" },
        { category: "Performance and Speed" },
        { category: "Customer Support" },
        { category: "Billing and Subscription" },
        { category: "Security and Compliance" },
        { category: "API Usage and Functionality" },
        { category: "Account Management" },
        { category: "Miscellaneous" }
    ]

    const SendEmail = () => {
        emailjs.sendForm('service_48ie7qs', 'template_vx1z2un', form.current, 'u52fGo9v9_4YPsyao')
            .then(() => {
                cogoToast.success(
                    <div>
                        <b>Success</b>
                        <div>Feedback sent successfully</div>
                    </div>, { position: 'top-right' }
                )
            }).catch(() => {
                cogoToast.error(
                    <div>
                        <b>Error</b>
                        <div>Feedback not sent, try again</div>
                    </div>, { position: 'top-right' }
                )
            })
    }

    const {
        values,
        errors,
        HandleChange,
        HandleSubmit,
    } = UseForm(SendEmail, Validate)

    return (
        <section className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-y-2 lg:gap-y-4 ">
                <span className="text-4xl lg:text-6xl text-center font-extrabold text-[#2E2C34]">Contact Us Page!</span>
                <span className="text-xl text-[#667085] font-light text-center">This page contains information on how to reach us.</span>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-y-2 lg:gap-y-4">
                <form className="w-full max-w-xl" ref={form} onSubmit={HandleSubmit}>
                    <div className="form-input">
                        <label>Name</label>
                        <input name='name' value={values.name || ''} onChange={HandleChange} type="text" />
                        {errors.name && (<p className="help">{errors.name}</p>)}
                    </div>
                    <div className="form-input">
                        <label>Email</label>
                        <input name='email' value={values.email || ''} onChange={HandleChange} type="email" />
                        {errors.email && (<p className="help">{errors.email}</p>)}
                    </div>
                    <div className="form-input">
                        <label>Feedback Category</label>
                        <Select
                            name='category'
                            isSearchable
                            value={feedbackData.find(option => option.category === values.category)}
                            options={feedbackData}
                            styles={customStyles}
                            placeholder='Select option...'
                            getOptionLabel={(option) => option.category}
                            getOptionValue={(option) => option.category}
                            onChange={HandleChange}
                        />
                        {errors.category && (<p className="help">{errors.category}</p>)}
                    </div>
                    <div className="form-input contact-form-area">
                        <label>Message</label>
                        <textarea className='' name="message" id="" rows="10" cols="30" value={values.message || ''} onChange={HandleChange} ></textarea>
                        {errors.message && (<p className="help">{errors.message}</p>)}
                    </div>
                    <div className='flex justify-end'>
                        <button type='submit' className='items-center px-6  gap-x-3 flex py-2.5 border border-[#2E2C34] rounded-lg'>
                            Send Message
                            <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
                                <path d="M14.2199 21.9352C13.0399 21.9352 11.3699 21.1052 10.0499 17.1352L9.32988 14.9752L7.16988 14.2552C3.20988 12.9352 2.37988 11.2652 2.37988 10.0852C2.37988 8.91525 3.20988 7.23525 7.16988 5.90525L15.6599 3.07525C17.7799 2.36525 19.5499 2.57525 20.6399 3.65525C21.7299 4.73525 21.9399 6.51525 21.2299 8.63525L18.3999 17.1252C17.0699 21.1052 15.3999 21.9352 14.2199 21.9352ZM7.63988 7.33525C4.85988 8.26525 3.86988 9.36525 3.86988 10.0852C3.86988 10.8052 4.85988 11.9052 7.63988 12.8252L10.1599 13.6652C10.3799 13.7352 10.5599 13.9152 10.6299 14.1352L11.4699 16.6552C12.3899 19.4352 13.4999 20.4252 14.2199 20.4252C14.9399 20.4252 16.0399 19.4352 16.9699 16.6552L19.7999 8.16525C20.3099 6.62525 20.2199 5.36525 19.5699 4.71525C18.9199 4.06525 17.6599 3.98525 16.1299 4.49525L7.63988 7.33525Z" fill="#2E2C34"></path>
                                <path d="M10.11 14.7052C9.92005 14.7052 9.73005 14.6352 9.58005 14.4852C9.29005 14.1952 9.29005 13.7152 9.58005 13.4252L13.16 9.83518C13.45 9.54518 13.93 9.54518 14.22 9.83518C14.51 10.1252 14.51 10.6052 14.22 10.8952L10.64 14.4852C10.5 14.6352 10.3 14.7052 10.11 14.7052Z" fill="#2E2C34"></path>
                            </svg>
                        </button>
                    </div>
                </form>

            </div>
        </section >
    )
}

export default ContactUsPage