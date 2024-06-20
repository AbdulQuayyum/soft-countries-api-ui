import React, { useState, useEffect } from 'react';
import { PiXThin, PiEyeThin, PiEyeSlashThin } from "react-icons/pi";

const AuthModal = ({ prop, setShowModal }) => {
    const [fields, setFields] = useState({ email: "", password: "" })
    const [type, setType] = useState(prop)
    const [forgotPasswordStep, setForgotPasswordStep] = useState(1)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [forgotPasswordFields, setForgotPasswordFields] = useState({ email: "", password: "", pin: "" });
    const info = {
        register: {
            linkHeading: "Have an existing account",
            linkSubheading: "Sign in",
            buttonText: "Create Account",
            header: "Create an account",
            to: "login"
        },
        login: {
            linkHeading: "Don't have an account",
            linkSubheading: "Sign up",
            buttonText: "Sign in",
            header: "Sign In",
            to: "register"
        },
        forgotPassword: {
            linkHeading: "",
            linkSubheading: "",
            buttonText: "Submit",
            header: "Forgot Password",
        },
    }

    function TogglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const HandleChange = event => {
        const { name, value } = event.target;
        if (type === "forgotPassword") {
            setForgotPasswordFields({ ...forgotPasswordFields, [name]: value });
        } else {
            setFields({ ...fields, [name]: value });
        }
    }

    const HandleSubmit = () => {
        if (type === "register") {
            setShowModal(false)
        } else if (type === "login") {
            setShowModal(false)
        } else if (type === "forgotPassword") {
            if (forgotPasswordStep === 1) {
                setForgotPasswordStep(2);
            } else if (forgotPasswordStep === 2) {
                setForgotPasswordStep(3);
            } else if (forgotPasswordStep === 3) {
                setShowModal(false)
            }
        }
    };

    useEffect(() => {
        setFields({ email: "", password: "" });
        setForgotPasswordFields({ email: "", password: "", pin: "" })
    }, [setType])

    const IsDisabled = type === "forgotPassword" ? forgotPasswordStep === 1 ? !forgotPasswordFields.email : forgotPasswordStep === 2 ? !forgotPasswordFields.pin : !forgotPasswordFields.password : !fields.email || !fields.password;
    const isEmailDisabled = type === "forgotPassword" && forgotPasswordStep > 1;
    const isPinDisabled = type === "forgotPassword" && forgotPasswordStep > 2;

    return (
        <div className='modal'>
            <div className='modal-content'>
                <PiXThin className='modal-close' onClick={() => { setShowModal(false) }} />
                <div className='flex flex-col items-center'>
                    <div className='flex items-center justify-center pb-6'>
                        <img src="/logo.png" alt="logo" className='object-contain w-auto h-10' />
                    </div>
                    <div className='flex items-center justify-center w-full p-6 bg-black rounded-md'>
                        <span className='text-white font-[500] text-[24px] sm:text-[40px] leading-[40px]'>{info[type].header}</span>
                    </div>
                    <div className='flex items-center justify-center p-4'>
                        {(type !== "forgotPassword") &&
                            <span className='text-[#283646] font-[500] text-[12px] sm:text-[14px] leading-[20px]'>{info[type].linkHeading}? <span onClick={() => { setType(info[type].to) }} className="cursor-pointer">{info[type].linkSubheading}</span></span>
                        }
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col my-2 gap-y-1'>
                        <span className='font-[400] text-[12px] sm:text-[14px] text-[#0C141D]'>Email Address</span>
                        <input
                            type="email"
                            name='email'
                            value={type === "forgotPassword" ? forgotPasswordFields.email : fields.email}
                            onChange={HandleChange}
                            disabled={isEmailDisabled}
                            placeholder="youremail@email.com"
                            className="w-full px-6 py-3 text-sm transition-all text-black duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed"
                        />
                    </div>
                    {type === "forgotPassword" && forgotPasswordStep > 1 &&
                        <div className='flex flex-col my-2 gap-y-1'>
                            <span className='font-[400] text-[12px] sm:text-[14px] text-[#0C141D]'>Confirmation PIN</span>
                            <input
                                type="text"
                                name='pin'
                                value={forgotPasswordFields.pin}
                                onChange={HandleChange}
                                disabled={isPinDisabled}
                                placeholder="Enter your PIN"
                                className="w-full px-6 py-3 text-sm transition-all text-black duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed"
                            />
                        </div>
                    }
                    {type === "forgotPassword" && forgotPasswordStep === 3 &&
                        <div className='flex flex-col my-2 gap-y-1'>
                            <span className='font-[400] text-[12px] sm:text-[14px] text-[#0C141D]'>Password</span>
                            <div className="relative">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={forgotPasswordFields.password}
                                    name='password'
                                    onChange={HandleChange}
                                    placeholder="********"
                                    className="w-full px-6 py-3 text-sm transition-all text-black duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed"
                                />
                                <button
                                    className="absolute inset-y-0 bottom-0 right-0 flex items-center px-4 text-black"
                                    onClick={TogglePasswordVisibility}
                                >
                                    {isPasswordVisible ? (
                                        <PiEyeThin />
                                    ) : (
                                        <PiEyeSlashThin />
                                    )}
                                </button>
                            </div>
                        </div>
                    }
                    {type !== "forgotPassword" &&
                        <div className='flex flex-col my-2 gap-y-1'>
                            <span className='font-[400] text-[12px] sm:text-[14px] text-[#0C141D]'>Password</span>
                            <div className="relative">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={fields.password}
                                    name='password'
                                    onChange={HandleChange}
                                    placeholder="********"
                                    className="w-full px-6 py-3 text-sm transition-all text-black duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed"
                                />
                                <button
                                    className="absolute inset-y-0 bottom-0 right-0 flex items-center px-4 text-black"
                                    onClick={TogglePasswordVisibility}
                                >
                                    {isPasswordVisible ? (
                                        <PiEyeThin />
                                    ) : (
                                        <PiEyeSlashThin />
                                    )}
                                </button>
                            </div>
                        </div>
                    }
                    {type !== "forgotPassword" &&
                        <div className='flex flex-row justify-between my-2'>
                            <div className='flex flex-row items-center gap-x-2'>
                                <input type="checkbox" name="remember" id="remember" className='accent-[#101042] h-4 w-4 cursor-pointer' />
                                <span className='font-[400] text-[12px] sm:text-[14px] text-[#77808B]'>Remember my login</span>
                            </div>
                            <div className='flex py-2'>
                                <span className='cursor-pointer font-[500] text-[12px] sm:text-[14px] text-[#0C141D]' onClick={() => { setType("forgotPassword") }}>Forgot Password?</span>
                            </div>
                        </div>
                    }
                    <div className='flex justify-center w-full mt-5 gap-x-4'>
                        <button
                            disabled={IsDisabled}
                            onClick={HandleSubmit}
                            className='w-full px-8 py-4 text-sm text-white transition-all bg-black border border-black rounded-md sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:text-black hover:bg-transparent'>
                            {info[type].buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthModal