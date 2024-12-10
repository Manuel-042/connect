
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Button, { buttonStyles } from "../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import { LuX } from "react-icons/lu";
import { LoginForm } from "../../features/authentication";
import google from "../../../src/assets/search.png"
import apple from '../../../src/assets/apple.png'
import twitter from "../../../src/assets/twitter-svg.svg"

const Login = () => {
    const modalRoot = document.getElementById('modal-root');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.previousLocation;

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

    return ReactDOM.createPortal(
        <div className="modal-overlay1" onClick={handleCloseModal}>

            <div onClick={(e) => e.stopPropagation()} className="relative text-white bg-black px-3 py-4 rounded-2xl w-1/2 flex flex-col items-center">

                <Button
                    type="button"
                    onClick={handleCloseModal}
                    className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "close-button bg-transparent hover:bg-transparent text-white w-10 h-10")}
                >
                    <LuX className="text-2xl" />
                </Button>

        
                <div className='flex flex-col items-center justify-between gap-2 mb-7 w-[50%]'>
                    <img src={twitter} alt="twitter logo" className="w-10 h-10 object-contain mb-4" />

                    <h1 className="font-bold text-3xl mb-5 self-start text-slate-100">Sign in to X</h1>

                    <button className='dark:bg-white text-black text-sm font-bold rounded-full flex gap-2 items-center justify-center w-full py-2'>
                        <img src={google} alt="Google icon" className='w-4 h-4' />
                        <p>Sign up with Google</p>
                    </button>

                    <button className='dark:bg-white text-black text-sm font-bold rounded-full flex gap-2 items-center justify-center w-full py-2'>
                        <img src={apple} alt="Apple icon" className='w-4 h-4' />
                        <p>Sign up with Apple</p>
                    </button>

                    <span><p className='dark:text-dark-text text-sm'>or</p></span>

                    <LoginForm />

                    <div className="text-base self-start mt-5 dark:text-dark-text">Don't have an account? <span><Link to="/i/flow/signup" className="text-secondary-100 hover:underline underline-offset-1">Signup</Link></span></div>
                </div>
            </div>
        </div>,
        modalRoot
    );
}

export default Login

