import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import Button from "../../../components/UI/Button";
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

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
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch {
      setError("email", { message: "No account found with this email" })
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
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border-1 shadow-sm dark:shadow-neutral-800 dark:bg-neutral-700 dark:text-neutral-300  px-4 py-2 rounded-full focus:outline-1"
        />
        {errors.password && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>
      <Link to="/forgot-password" className="text-xs text-blue-700 hover:underline underline-offset-1 self-end">Forgot Password</Link>
      <Button type="submit" disabled={isSubmitting} className="w-full mt-3">{isSubmitting ? "Loading..." : "Continue"}</Button>
    </form>
  )
};

export default LoginForm;
