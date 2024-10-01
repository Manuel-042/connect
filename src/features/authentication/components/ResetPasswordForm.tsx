import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import Button from "../../../components/UI/Button";
import { zodResolver } from '@hookform/resolvers/zod';

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const schema = z.object({
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

const ResetPasswordForm: React.FunctionComponent = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch {
      setError("password", { message: "Your new password cannot be the same as your previous password" })
    }
  }


  return (
    <form className="flex flex-col items-center gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-items-center gap-3 w-full">
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border-1 shadow-sm dark:shadow-neutral-800 dark:bg-neutral-700 dark:text-neutral-300  px-4 py-2 rounded-full focus:outline-1"
        />
        {errors.password && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
        <input
          type="password"
          {...register("cpassword")}
          placeholder="Confirm Password"
          className="border-1 shadow-sm dark:shadow-neutral-800 dark:bg-neutral-700 dark:text-neutral-300  px-4 py-2 rounded-full focus:outline-1"
        />
        {errors.cpassword && (
          <p className="text-xs text-red-600">{errors.cpassword.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full mt-3">{isSubmitting ? "Loading..." : "Reset Password"}</Button>
    </form>
  )
};

export default ResetPasswordForm;
