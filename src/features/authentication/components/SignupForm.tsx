import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import Button from "../../../components/UI/Button";
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/auth-context';
import { AxiosError } from 'axios';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordValidation,
      { message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" }),
  cpassword: z.string()
}).refine(data => data.password === data.cpassword, {
  message: "Password must match",
  path: ["cpassword"]
})

type FormFields = z.infer<typeof schema>

const SignupForm: React.FunctionComponent = () => {
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(schema) });
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<FaEyeSlash />);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    reset();
    try {
      const response = await api.post('api/register', data);
      console.log(response.data);
      setUser({ name: data.name, email: data.email });
      navigate("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          setError('root', { message: "No server response" })
        } else {
          console.log(err.response?.data);
        }
      } else {
        console.error("Non Axios error:", err)
      }
    }
  }

  const handleFocus = (field: string) => {
    if (field === 'password') {
      setIsPasswordVisible(true);
    } else if (field === 'confirmPassword') {
      setIsConfirmPasswordVisible(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>, field: string) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      if (field === 'password') {
        setIsPasswordVisible(false);
      } else if (field === 'confirmPassword') {
        setIsConfirmPasswordVisible(false);
      }
    }
  };

  const handleToggle = () => {
    if (type === 'password') {
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
          {...register("name")}
          placeholder="username"
          className="border-1 shadow-sm dark:shadow-neutral-800  dark:bg-neutral-700 dark:text-neutral-300 px-4 py-2 rounded-full focus:outline-1"
        />
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
        <input
          type="text"
          {...register("email")}
          placeholder="email"
          className="border-1 shadow-sm dark:shadow-neutral-800  dark:bg-neutral-700 dark:text-neutral-300  px-4 py-2 rounded-full focus:outline-1"
        />
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
        <div className="relative">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="border-1 shadow-sm dark:shadow-neutral-800 dark:bg-neutral-700 dark:text-neutral-300  px-4 py-2 rounded-full focus:outline-1 w-full"
            onFocus={() => handleFocus("password")}
            onBlur={(event) => handleBlur(event, "password")}    
            onClick={() => handleFocus("password")}
          />
          <span className={`absolute top-[12px] z-10 right-[20px] text-white cursor-pointer ${isPasswordVisible ? 'visible' : 'invisible'}`} onMouseDown={(e) => e.preventDefault()} onClick={handleToggle}>
            {icon}
          </span>
        </div>
        {errors.password && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
        <div className="relative">
          <input
            type="password"
            {...register("cpassword")}
            placeholder="Confirm Password"
            className="border-1 shadow-sm dark:shadow-neutral-800 dark:bg-neutral-700 dark:text-neutral-300  px-4 py-2 rounded-full focus:outline-1 w-full"
            onFocus={() => handleFocus("confirmPassword")}
            onBlur={(event) => handleBlur(event, "confirmPassword")}    
            onClick={() => handleFocus("confirmPassword")}
          />
          <span className={`absolute top-[12px] z-10 right-[20px] text-white cursor-pointer ${isConfirmPasswordVisible ? 'visible' : 'invisible'}`} onMouseDown={(e) => e.preventDefault()} onClick={handleToggle}>
            {icon}
          </span>
        </div>
        {errors.cpassword && (
          <p className="text-xs text-red-600">{errors.cpassword.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full mt-3">{isSubmitting ? "Loading..." : "Continue"}</Button>
    </form>
  )
};

export default SignupForm;
