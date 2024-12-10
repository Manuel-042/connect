import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import google from "../../src/assets/search.png"
import apple from '../../src/assets/apple.png'
import twitterLogo from '../../src/assets/twitter-svg.svg'
import Button, { buttonStyles } from '../components/UI/Button';
import { twMerge } from 'tailwind-merge';

const Landing: React.FunctionComponent = () => {
    const location = useLocation();

    return (
        <div className="flex gap-3 w-full min-h-screen relative">
            <div className='w-1/2 flex items-center justify-center'>
                <img src={twitterLogo} alt="twitter logo" className='w-[60%] h-[60%] object-cover'/>
            </div>

            <div className="w-1/2 flex flex-col">           
                <h1 className="mt-24 font-extrabold text-7xl dark:text-white">Happening now</h1>

                <h3 className='dark:text-white text-3xl font-extrabold my-8'>Join today.</h3>

                <div className='flex flex-col items-center justify-between gap-2 w-[50%]'>

                    <button className='dark:bg-white text-sm font-bold rounded-full flex gap-2 items-center justify-center w-full py-2'>
                        <img src={google} alt="Google icon" className='w-4 h-4' />
                        <p>Sign up with Google</p>
                    </button>

                    <button  className='dark:bg-white text-sm font-bold rounded-full flex gap-2 items-center justify-center w-full py-2'>
                        <img src={apple} alt="Apple icon" className='w-4 h-4' />
                        <p>Sign up with Apple</p>
                    </button>
                    <span><p className='dark:text-dark-text text-sm'>or</p></span>

                    <Button className={twMerge(buttonStyles(), "font-bold w-full")}>
                        <Link to="/i/flow/signup" state={{ previousLocation: location.pathname }} className='w-full h-full'>Create Account</Link>
                    </Button>
                    
                    <p className='-mt-1 dark:text-dark-text text-[0.65rem]'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>

                    <div className="text-xs dark:text-neutral-300 mt-4 w-full">
                        <h4 className='font-extrabold dark:text-white text-xl mb-3'>Already have an account?</h4>
                        
                        <Button className={twMerge(buttonStyles(), "bg-transparent py-2 border border-dark-text text-secondary hover:bg-secondary-100 hover:bg-opacity-15 text-base font-bold w-full")}>
                            <Link to="/i/flow/login" state={{ previousLocation: location.pathname }} className='w-full h-full'>
                                Sign in
                            </Link>
                        </Button>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Landing;