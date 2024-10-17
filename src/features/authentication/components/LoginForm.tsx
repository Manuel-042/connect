import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import Button from "../../../components/UI/Button";
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { useAuthContext } from '../../../context/auth-context';
import { AxiosError } from 'axios';
import { Oval } from 'react-loader-spinner'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const schema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordValidation,
      { message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" }),
})

type FormFields = z.infer<typeof schema>

const LoginForm: React.FunctionComponent = () => {
  const { setToken, user, decodeToken } = useAuthContext();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({ defaultValues: {email: user?.email}, resolver: zodResolver(schema) });
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<FaEyeSlash />);
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);

    try {
      const response = await api.post('api/token', data);
      console.log(response.data);
      setToken(response.data.access);
      decodeToken(response.data.access);
      reset();
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          setError('root', {message: "No server response"})
        } else {
          console.log(err.response?.data);  
        }
      } else {
        console.error("Non Axios error:", err)
      }
    }
  }

  const handleFocus = () => {
    setIsVisible(true); 
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsVisible(false);
    }
  };

  const handleToggle = () => {
    if (type==='password'){
       setIcon(<FaEye />);
       setType('text')
    } else {
       setIcon(<FaEyeSlash />)
       setType('password')
    }
 }


  return (
    <form className="flex flex-col items-center gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-items-center gap-3 w-full">
        <input
          type="text"
          {...register("email")}
          placeholder="email"
          className="border-1 shadow-sm dark:shadow-neutral-800  dark:bg-neutral-700 dark:text-neutral-300  px-4 py-2 rounded-full focus:outline-1"
        />
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
        <div className='relative'>
          <input
            type={type}
            {...register("password")}
            placeholder="Password"
            className="border-1 shadow-sm dark:shadow-neutral-800 dark:bg-neutral-700 dark:text-neutral-300 px-4 py-2 rounded-full focus:outline-1 w-full"
            onFocus={handleFocus}
            onBlur={handleBlur}    
            onClick={handleFocus}
          />
          <span className={`absolute top-[12px] z-10 right-[20px] text-white cursor-pointer ${isVisible ? 'visible' : 'invisible'}`} onMouseDown={(e) => e.preventDefault()} onClick={handleToggle}>
            {icon}
          </span>
        </div>
        {errors.password && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>
      <Link to="/forgot-password" className="text-xs text-blue-700 hover:underline underline-offset-1 self-end">Forgot Password</Link>
      <Button type="submit" disabled={isSubmitting}   className={`w-full mt-3 flex items-center justify-center ${isSubmitting ? "cursor-not-allowed" : ""}`}>
        {isSubmitting ? (<Oval
          visible={true}
          height="30"
          width="30"
          color="#ffffff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />) : "Continue"}
          </Button>
    </form>
  )
};

export default LoginForm;
