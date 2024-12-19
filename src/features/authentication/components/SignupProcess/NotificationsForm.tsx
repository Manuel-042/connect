import { twMerge } from "tailwind-merge"
import Button, { buttonStyles } from "../../../../components/UI/Button"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useApiPrivate from "../../../../hooks/useApiPrivate";


type NotificationsFormProps = {
  key?: string;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (key: string, value: string | boolean) => void;
}

const NotificationsForm: React.FC<NotificationsFormProps> = ({ next, setLoading, updateFormData }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false)
  const apiPrivate = useApiPrivate()

  const handleSubmit = async () => {
    setLoading(true);
    setNotification(true)

    try {
      const response = await apiPrivate.post('/api/signup/steps/6', { notification: notification });
      console.log(response);
      console.log({ notification });

      if (response.status === 200) {
        setLoading(false);
        updateFormData("notifications", true)
        navigate("/home");
      } else {
        setLoading(false);
        // setErrors('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      // setErrors('An error occurred. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col flex-grow">
      <h1 className="dark:text-white font-semibold text-3xl mb-1">Turn on notifications</h1>
      <p className="dark:text-dark-text text-base mb-7">Get the most out of X by staying up to date with what's happening.</p>

      <div className='mt-10 flex gap-3 flex-col'>
        <Button
          onClick={handleSubmit}
          type="button"
          className={twMerge(buttonStyles(), "w-full py-3 font-bold bg-white text-black disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-white hover:bg-opacity-80 disabled:hover:bg-white disabled:hover:bg-opacity-50")}
        >
          Allow Notifications
        </Button>

        <Button
          onClick={() => navigate("/home")}
          type="button"
          className={twMerge(buttonStyles(), "w-full py-3 font-bold text-white bg-transparent border border-white disabled:bg-transparent disabled:cursor-not-allowed hover:bg-transparent disabled:hover:bg-transparent")}
        >
          Skip for now
        </Button>
      </div>
    </div>
  )
}

export default NotificationsForm