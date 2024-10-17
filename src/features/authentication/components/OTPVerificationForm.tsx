import { SubmitHandler, useForm } from 'react-hook-form'
import Button from "../../../components/UI/Button";
import api from '../../../api/api';
import { Oval } from 'react-loader-spinner'
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';

interface FormValues {
  otp: string[];
}

const OTPVerificationForm: React.FunctionComponent = () => {
  const { register, handleSubmit, setError, setValue, watch, formState: { isSubmitting } } = useForm<FormValues>();

  var length = 6 
  const otpValues = watch("otp");

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text");
    if (pastedData.length === length) {
      pastedData.split("").forEach((char, index) => {
        setValue(`otp.${index}`, char);
      });
    }
  };


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const otpString = Object.values(data.otp).join(""); 

    console.log(otpString);

    const OTPData = {
      'email': email,
      'otp_code': otpString
    }

    console.log(OTPData);

    try {
      const response = await api.post('api/verify-otp', OTPData);
      console.log('OTP verified:', response.data);
      navigate("/reset-password", { state: { email: email } });
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
  };

  return (
    <form className="flex flex-col items-center gap-7 w-full" onSubmit={handleSubmit(onSubmit)} >
      <div className="flex flex-row justify-items-center gap-2 w-full">
        {Array(length).fill(null).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            {...register(`otp.${index}`, {
              required: true,
              validate: (value) => value.trim().length === 1
            })}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && otpValues[index] === "") {
                const prevField = document.getElementById(`otp-${index - 1}`);
                if (prevField) prevField.focus();
              }
            }}
            onPaste={handlePaste}
            id={`otp-${index}`}
            className="w-12 border-2 shadow-sm dark:shadow-neutral-800  dark:bg-neutral-700 dark:text-neutral-300  px-1 py-3 text-center text-3xl font-bold rounded-md focus:outline-1"
          />
        ))}
      </div>
      <Button type="submit" disabled={isSubmitting} className={`w-full mt-3 flex items-center justify-center ${isSubmitting ? "cursor-not-allowed" : ""}`}>{isSubmitting ? (<Oval
          visible={true}
          height="30"
          width="30"
          color="#ffffff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />)
           : 'Submit OTP'}
      </Button>
    </form>
  );
};

export default OTPVerificationForm;
