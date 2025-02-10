import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import Button from "../../../components/UI/Button";
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Oval } from 'react-loader-spinner'


const schema = z.object({
  email: z.string().email()
})

type FormFields = z.infer<typeof schema>

const ForgotForm: React.FunctionComponent = () => {
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await api.post('api/otp', data);
      console.log(response.data);
      reset();
      navigate('/verify-code', { state: { email: data.email } });
    } catch (err) {
      if (err instanceof AxiosError
      ) {
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
      </div>
      <Button type="submit" disabled={isSubmitting} className={`w-full mt-3 flex items-center justify-center ${isSubmitting ? "cursor-not-allowed" : ""}`}> {isSubmitting ? (
        <Oval
          visible={true}
          height="30"
          width="30"
          color="#ffffff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />) : "Reset Password"}</Button>
    </form>
  )
};

export default ForgotForm;
