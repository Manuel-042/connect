import Button from "../../../components/UI/Button";

interface  SignupFormProps {
}

const SignupForm: React.FunctionComponent< SignupFormProps> = () => {
  return (
    <form className="flex flex-col justify-between items-center gap-2 h-2/3">
        <div className="flex flex-col justify-items-center gap-3">
            <input type="text" placeholder="email" className="border-1 shadow-sm px-4 py-2 rounded-full"/>
            <input type="text" placeholder="*******" className="border-1 shadow-sm px-4 py-2 rounded-full"/>
        </div>

        <Button type="submit" className="w-full">Continue</Button>
    </form>
  )
};

export default SignupForm ;
