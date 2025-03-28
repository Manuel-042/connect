import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";

const Confirmation: React.FunctionComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-2 relative">
            <Link to="/" className="justify-self-start self-start font-bold absolute top-4 dark:text-neutral-300">CONNECT</Link>
            <div className="w-80 gap-8 flex flex-col justify-between items-center border-1 shadow-md dark:shadow-neutral-800 rounded-md px-5 py-6">
                <div className="text-center flex flex-col">
                    <FaCheckCircle fontSize="30px" className='dark:text-neutral-300 self-center'/>
                    <h1 className="font-semibold text-xl dark:text-neutral-300 mt-3">All Done</h1>
                    <p className="font-light text-xs dark:text-neutral-300">Your password has been reset. Head back to the Login screen and proceed</p>
                </div>
                <Link to="/login" className="text-xs text-blue-700 hover:underline underline-offset-1">Back to Login</Link>
            </div>
        </div>
    );
};

export default Confirmation;
