import * as React from 'react';
import { Link } from 'react-router-dom';
import { ForgotForm } from '../../../features/authentication/index';
import { FaEnvelope } from "react-icons/fa";

const Login: React.FunctionComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-2 relative">
            <Link to="/" className="justify-self-start self-start font-bold absolute top-4 dark:text-neutral-300">CONNECT</Link>
            <div className="w-80 gap-8 flex flex-col justify-between items-center border-1 shadow-md dark:shadow-neutral-800 rounded-md px-5 py-6">
                <div className="text-center flex flex-col">
                    <FaEnvelope fontSize="30px" className='self-center dark:text-neutral-300'/>
                    <h1 className="font-semibold text-xl dark:text-neutral-300 mt-2">Forgot Password?</h1>
                    <p className="font-light text-xs dark:text-neutral-300">Don't worry, we will send you reset instructions</p>
                </div>
                <ForgotForm />
                <Link to="/login" className="text-sm text-blue-700 hover:underline underline-offset-1">Back to login</Link>
            </div>
        </div>
    );
};

export default Login;
