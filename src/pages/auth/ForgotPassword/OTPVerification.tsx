import * as React from 'react';
import { Link } from 'react-router-dom';
import { OTPVerificationForm } from '../../../features/authentication/index';
import { FaEnvelopeOpenText } from "react-icons/fa";

type OTPVerificationProps = {
    email: string;
}

const OTPVerification: React.FunctionComponent<OTPVerificationProps> = ({email}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-2 relative">
            <Link to="/" className="justify-self-start self-start font-bold absolute top-4 dark:text-neutral-300">CONNECT</Link>
            <div className="w-auto gap-8 flex flex-col justify-between items-center border-1 shadow-md dark:shadow-neutral-800 rounded-md px-5 py-6">
                <div className="text-center flex flex-col">
                    <FaEnvelopeOpenText className='self-center dark:text-neutral-300' fontSize="30px"/>
                    <h1 className="font-semibold text-xl dark:text-neutral-300 mt-3">Password Reset</h1>
                    <p className="font-light text-xs dark:text-neutral-300">We sent a code to <span className='font-bold'>{email}</span></p>
                </div>
                <OTPVerificationForm />
                <p className="text-xs dark:text-neutral-300">Didn't recieve an email? <Link to="/forgot-password" className="text-xs text-blue-700 hover:underline underline-offset-1">click to resend</Link></p>
                <Link to="/login" className="text-xs text-blue-700 hover:underline underline-offset-1">Back to Login</Link>
            </div>
        </div>

    );
};

export default OTPVerification;
