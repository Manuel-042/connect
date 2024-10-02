import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import Button from "../../../components/UI/Button";
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email()
})

type FormFields = z.infer<typeof schema>

const OTPVerificationForm: React.FunctionComponent = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch {
      setError("root", { message: "Invalid code" })
    }
  }


  return (
    <form className="flex flex-col items-center gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-items-center gap-2 w-full">
        <input
          type="text"
          className="w-16 border-1 shadow-sm dark:shadow-neutral-800  dark:bg-neutral-700 dark:text-neutral-300  px-4 py-4 text-center text-3xl font-bold rounded-md focus:outline-1"
        />
        <input
          type="text"
          className="w-16 border-1 shadow-sm dark:shadow-neutral-800  dark:bg-neutral-700 dark:text-neutral-300  px-4 py-4 text-center text-3xl font-bold rounded-md focus:outline-1"
        />
        <input
          type="text"
          className="w-16 border-1 shadow-sm dark:shadow-neutral-800  dark:bg-neutral-700 dark:text-neutral-300  px-4 py-4 text-center text-3xl font-bold rounded-md focus:outline-1"
        />
        <input
          type="text"
          className="w-16 border-1 shadow-sm dark:shadow-neutral-800  dark:bg-neutral-700 dark:text-neutral-300  px-4 py-4 text-center text-3xl font-bold  rounded-md focus:outline-1"
        />
      </div>
        {errors.root && (
          <p className="text-xs text-red-600">{errors.root.message}</p>
        )}
      <Button type="submit" disabled={isSubmitting} className="w-full mt-3">{isSubmitting ? "Loading..." : "Reset Password"}</Button>
    </form>
  )
};

export default OTPVerificationForm;
