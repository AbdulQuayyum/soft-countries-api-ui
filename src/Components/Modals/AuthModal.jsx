import React, { useState, useEffect } from 'react';
import { PiXThin, PiEyeThin, PiEyeSlashThin } from "react-icons/pi";
import { TbLoader3 } from 'react-icons/tb';
import cogoToast from 'cogo-toast';

import assests from "../../Assets/Index"
import { UseAuth } from '../../Contexts/Auth.Context';
import { CreateAccount, ForgotPassword, ResetPassword } from '../../APIs/auth.api';

const AuthModal = ({ prop, setShowModal }) => {
    const { signin } = UseAuth()
    const [fields, setFields] = useState({ email: "", password: "" })
    const [type, setType] = useState(prop)
    const [isLoading, setIsLoading] = useState(false);
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

    const HandleSubmit = async () => {
        setIsLoading(true);
        try {
            if (type === "register") {
                await CreateAccount(fields.email, fields.password);
                cogoToast.success(
                    <div>
                        <b>Success!</b>
                        <div>Account created successfully. <br /> Please check your email to verify your account.</div>
                    </div>, { position: 'top-right' }
                );
                setShowModal(false);
            } else if (type === "login") {
                await signin(fields.email, fields.password);
                cogoToast.success(
                    <div>
                        <b>Success!</b>
                        <div>Login successful!</div>
                    </div>, { position: 'top-right' }
                );
                setShowModal(false);
            } else if (type === "forgotPassword") {
                if (forgotPasswordStep === 1) {
                    await ForgotPassword(forgotPasswordFields.email);
                    cogoToast.success(
                        <div>
                            <b>Success!</b>
                            <div>Verification code sent to your email.</div>
                        </div>, { position: 'top-right' }
                    );
                    setForgotPasswordStep(2);
                } else if (forgotPasswordStep === 2) {
                    setForgotPasswordStep(3);
                } else if (forgotPasswordStep === 3) {
                    await ResetPassword(forgotPasswordFields.email, forgotPasswordFields.pin, forgotPasswordFields.password);
                    cogoToast.success(
                        <div>
                            <b>Success!</b>
                            <div>Password reset successfully.</div>
                        </div>, { position: 'top-right' }
                    );
                    setType("login");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            cogoToast.error(
                <div>
                    <b>{error.response?.data?.message || "Error!"}</b>
                    <div>{error.response?.data?.error || "Something went wrong. Please try again."}</div>
                </div>, { position: 'top-right' }
            );
        } finally {
            setIsLoading(false);
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
                        <img src={assests.logoBlack} alt="logo" className='object-contain w-auto h-10' />
                    </div>
                    <div className='flex items-center justify-center w-full p-6 bg-[#2E2C34] rounded-md'>
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
                            className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed"
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
                                className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed"
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
                                    className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed"
                                />
                                <button
                                    className="absolute inset-y-0 bottom-0 right-0 flex items-center px-4 text-[#2E2C34]"
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
                                    className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed"
                                />
                                <button
                                    className="absolute inset-y-0 bottom-0 right-0 flex items-center px-4 text-[#2E2C34]"
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
                        <div className='flex flex-row justify-end my-2'>
                            <div className='flex py-2'>
                                <span className='cursor-pointer font-[500] text-[12px] sm:text-[14px] text-[#0C141D]' onClick={() => { setType("forgotPassword") }}>Forgot Password?</span>
                            </div>
                        </div>
                    }
                    <div className='flex justify-center w-full mt-5 gap-x-4'>
                        <button
                            disabled={IsDisabled}
                            onClick={HandleSubmit}
                            className={`w-full justify-center flex items-center px-8 py-4 text-sm text-white transition-all bg-[#2E2C34] border border-[#2E2C34] rounded-md sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#2E2C34] hover:bg-transparent ${isLoading ? ' cursor-wait' : ' cursor-pointer'}`}>
                            {isLoading ? (<TbLoader3 size={24} className="animate-spin" />) : (<span className='font-[500] text-[14px]'>{info[type].buttonText}</span>)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthModal