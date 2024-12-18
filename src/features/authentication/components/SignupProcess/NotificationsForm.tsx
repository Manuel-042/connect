import { twMerge } from "tailwind-merge"
import Button, { buttonStyles } from "../../../../components/UI/Button"
import { useNavigate } from "react-router-dom";

type NotificationsFormProps = {
  key?: string;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (key: string, value: string | boolean) => void;
}

const NotificationsForm: React.FC<NotificationsFormProps> = ({ next, setLoading, updateFormData }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // const success = await api.post('/api/set-password', { password });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateFormData("notifications", true)
      navigate("/home");
    }, 2000);

    // if (success) {
    //     next();
    // }
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