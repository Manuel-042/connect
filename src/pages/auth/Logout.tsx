import { useNavigate } from "react-router-dom";
import twitter from "../../assets/white-twitter.png";
import Button from "../../components/UI/Button";
import { useAuthContext } from "../../context/auth-context";
import useApiPrivate from "../../hooks/useApiPrivate";
import { useToast } from "../../hooks/useToast";
import { AxiosError } from "axios";
import { Oval } from "react-loader-spinner";
import { useState } from "react";

const Logout = () => {
  const { profileData } = useAuthContext();
  const navigate = useNavigate();
  const apiPrivate = useApiPrivate();
  const { setToken } = useAuthContext();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    try {
      setIsSubmitting(true);
      await apiPrivate?.post("/api/logout");
      setToken(null);

      console.log("Logout successful");
      toast.success("Logout successful!");
      navigate(`/?logout=${profileData?.user.id}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          toast.error("No server response");
        } else {
          console.log(err.response?.data);
          toast.error(
            err.response.data?.message ||
              err.response.data?.detail ||
              "Login failed"
          );
        }
      } else {
        console.error("Non Axios error:", err);
        toast.error("An unexpected error occurred");
      }
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed top-0 z-50 overflow-hidden left-0 h-full w-full flex items-center justify-center transition-transform transform`}
      style={{ background: "rgba(91, 112, 131, 0.7)" }}
    >
      <div
        className={`bg-black flex flex-col rounded-3xl items-center justify-center p-6 w-4/5 sm:w-[30%]`}
      >
        <img src={twitter} alt="twitter logo" className="mb-2" />

        <div className="text-left flex flex-col items-start mb-5">
          <h2 className="font-extrabold dark:text-white text-lg">
            Logout of X?
          </h2>
          <p className="text-sm text-dark-text">
            You can always log back in at any time. If you just want to switch
            accounts, you can do that by adding an existing account.
          </p>
        </div>

        <div className="flex flex-col flex-1 w-full">
          <Button
            onClick={handleLogout}
            disabled={isSubmitting}
            className={`dark:bg-white dark:text-black dark:hover:bg-opacity-80 text-sm font-bold mb-2 py-3 flex items-center justify-center ${isSubmitting ? "cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? (
              <Oval
                visible={true}
                height="24"
                width="24"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Log Out"
            )}
          </Button>

          <Button
            onClick={goBack}
            className="bg-transparent dark:focus:bg-dark-border border border-dark-border text-white text-sm font-bold py-3"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
