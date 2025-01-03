
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Button, { buttonStyles } from "../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import { LuArrowLeft, LuX } from "react-icons/lu";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import twitter from "../../../src/assets/twitter-svg.svg"
import { CreateAccountForm } from "../../features/authentication";
import VerifyAccountForm from "../../features/authentication/components/SignupProcess/VerifyAccountForm";
import PasswordForm from "../../features/authentication/components/SignupProcess/PasswordForm";
import ProfilePictureForm from "../../features/authentication/components/SignupProcess/ProfilePictureForm";
import UserNameForm from "../../features/authentication/components/SignupProcess/UsernameForm";
import NotificationsForm from "../../features/authentication/components/SignupProcess/NotificationsForm";
import { Oval } from 'react-loader-spinner'

export type StepProps = {
    key?: string;
    next: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormData: (key: string, value: string | boolean) => void;
}

const SignUp = () => {
    const modalRoot = document.getElementById('modal-root');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.previousLocation;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        otp: "",
        password: "",
        profilePicture: "",
        username: "",
        notifications: false,
    });

    const updateFormData = (key: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const {
        steps,
        step,
        currentStepIndex,
        isFirstStep,
        back,
        next
    } = useMultiStepForm([
        <CreateAccountForm key="create" />,
        <VerifyAccountForm key="verify" email={formData.email} />,
        <PasswordForm key="password" />,
        <ProfilePictureForm key="profile" />,
        <UserNameForm key="username" />,
        <NotificationsForm key="notifications" />
    ]);

    const stepWithProps = React.cloneElement(step, {
        next,
        setLoading,
        updateFormData
    });


    useEffect(() => {
        disableBodyScroll(document.body);
        return () => {
            enableBodyScroll(document.body);
        };
    }, []);

    useEffect(() => {
        const appRoot = document.getElementById("root");
        const modalRoot = document.getElementById("modal-root");

        const appInnerDiv = appRoot?.firstElementChild;

        if (appInnerDiv && modalRoot && appInnerDiv.classList.contains("dark")) {
            modalRoot.classList.add("dark");
        } else if (modalRoot) {
            modalRoot.classList.remove("dark");
        }
    }, []);

    const handleCloseModal = () => {
        navigate(from, { replace: true });
    };

    if (!modalRoot) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return ReactDOM.createPortal(
        <div className="modal-overlay1">
            <div onClick={(e) => e.stopPropagation()} className="relative text-white bg-black px-8 lg:px-3 py-4 lg:rounded-2xl w-full h-screen lg:h-auto lg:w-1/2 flex flex-col items-center justify-center">
                <Button
                    type="button"
                    onClick={isFirstStep ? handleCloseModal : back}
                    className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "close-button bg-transparent hover:bg-transparent text-white w-10 h-10")}
                >
                    {isFirstStep ? <LuX className="text-2xl" /> : <LuArrowLeft className="text-2xl" />}
                </Button>

                <img src={twitter} alt="twitter logo" className="w-10 h-10 object-contain mb-7" />

                <div className='flex flex-col items-center flex-grow gap-2 mb-7 w-full lg:w-[70%] min-h-96' onSubmit={handleSubmit}>

                    <div className="absolute top-3 right-10">{currentStepIndex + 1} / {steps.length}</div>

                    {loading ? (

                        <div className="w-full h-full flex items-center justify-center flex-col flex-grow">
                            <Oval
                                visible={true}
                                height="30"
                                width="30"
                                color="#ffffff"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>)

                        : stepWithProps
                    }

                    {/* <div className="flex gap-3 items-center w-full my-4">
                        <Button
                            onClick={handleNextStep}
                            type="button"
                            disabled={loading || !isFormValid}
                            className={twMerge(buttonStyles(), "w-full py-3 font-bold")}
                        >
                            {loading ? "Loading..." : (isLastStep ? "Submit" : "Next")}
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>,
        modalRoot
    );
}

export default SignUp

