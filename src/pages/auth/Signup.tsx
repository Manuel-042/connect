
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useEffect, useState } from "react";
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


const SignUp = () => {
    const modalRoot = document.getElementById('modal-root');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.previousLocation;
    const [isFormValid, setIsFormValid] = useState(false);

    const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep, isFourthStep } = useMultiStepForm([<CreateAccountForm onFormValid={setIsFormValid}/>, <VerifyAccountForm email={"ebukaezeanya14@gmail.com"} />, <PasswordForm />, <ProfilePictureForm />, <UserNameForm />, <NotificationsForm />])

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

                <form className='flex flex-col justify-between gap-2 mb-7 w-full lg:w-[70%]' onClick={handleSubmit}>
                    <div className="absolute top-3 right-10">{currentStepIndex + 1} / {steps.length}</div>

                    {step}

                    <div className="flex gap-3 items-center w-full my-4">
                        <Button onClick={next} type="button" disabled={!isFormValid} className={twMerge(buttonStyles(), `w-full py-3 font-bold dark:bg-white text-black disabled:dark:bg-opacity-30 disabled:cursor-not-allowed`)}>{isLastStep
                            ? "Submit"
                            : (isFourthStep
                                ? "Skip for now"
                                : "Next")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>,
        modalRoot
    );
}

export default SignUp

