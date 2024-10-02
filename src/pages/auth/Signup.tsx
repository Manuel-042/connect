import { Link } from "react-router-dom";
import {SignupForm} from "../../features/authentication/index"

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-2 relative">
        <Link to="/" className="justify-self-start self-start font-bold absolute top-4 dark:text-neutral-300">CONNECT</Link>
        <div className="w-80 gap-8 flex flex-col justify-between items-center border-1 shadow-md dark:shadow-neutral-800 rounded-md px-5 py-6">
            <div className="text-center">
                <h1 className="font-semibold text-xl dark:text-neutral-300">Welcome to Connect</h1>
                <p className="font-light text-xs dark:text-neutral-300">Begin by creating your account</p>
            </div>
            <SignupForm />
            <div className="text-xs dark:text-neutral-300">Already have an account? <span><Link to="/login" className="text-blue-700 hover:underline underline-offset-1">Login</Link></span></div>
        </div>
    </div>
  )
};

export default Signup;
