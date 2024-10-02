import * as React from 'react';
import { Link } from 'react-router-dom';
import {LoginForm} from '../../features/authentication/index';

const Login: React.FunctionComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-2 relative">
            <Link to="/" className="justify-self-start self-start font-bold absolute top-4 dark:text-neutral-300">CONNECT</Link>
            <div className="w-80 gap-8 flex flex-col justify-between items-center border-1 shadow-md dark:shadow-neutral-800 rounded-md px-5 py-6">
                <div className="text-center">
                    <h1 className="font-semibold text-xl dark:text-neutral-300">Welcome Back</h1>
                    <p className="font-light text-xs dark:text-neutral-300">Enter your details to Login</p>
                </div>
                <LoginForm />
                <div className="text-xs dark:text-neutral-300">Dont have an account? <span><Link to="/signup" className="text-blue-700 hover:underline underline-offset-1">Signup</Link></span></div>
            </div>
        </div>
    );
};

export default Login;
