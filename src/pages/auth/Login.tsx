import * as React from 'react';
import { Link } from 'react-router-dom';
import {LoginForm} from '../../features/authentication/index';
import google from '../../../src/assets/search.png'
import apple from '../../../src/assets/apple.png'
import twitter from '../../../src/assets/twitter.png'

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
                <span><p className='dark:text-neutral-300 text-sm'>or sign up with</p></span>
                <div className='flex items-center justify-between gap-3'>
                    <button className='social'>
                        <img src={google} alt="Google icon" className='w-100 h-100' />
                    </button>
                    <button className='social'>
                        <img src={apple} alt="Apple icon" className='w-100 h-100' />
                    </button>
                    <button className='social'>
                        <img src={twitter} alt="X icon" className='w-100 h-100'/>
                    </button>
                </div>
                <div className="text-xs dark:text-neutral-300">Dont have an account? <span><Link to="/signup" className="text-blue-700 hover:underline underline-offset-1">Signup</Link></span></div>
            </div>
        </div>
    );
};

export default Login;
