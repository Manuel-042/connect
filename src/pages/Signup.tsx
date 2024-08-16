import { Link } from "react-router-dom";
import SignupForm from "../features/authentication/index.tsx";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-2 relative">
        <Link to="/" className="justify-self-start self-start font-bold absolute top-4">CONNECT</Link>
        <div className="w-80 h-[26rem] flex flex-col justify-between items-center border-1 shadow-md rounded-md hover-rounded-md px-2 py-3">
            <div>
                <h1 className="font-semibold text-xl">Welcome to Connect</h1>
                <p className="font-light text-xs">Begin by creating your account</p>
            </div>
            <SignupForm />
        </div>
    </div>
  )
};

export default Signup;
