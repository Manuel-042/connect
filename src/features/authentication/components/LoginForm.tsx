import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../components/UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../../api/api";
import { useAuthContext } from "../../../context/auth-context";
import { AxiosError } from "axios";
import { Oval } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useToast } from "../../../hooks/useToast";

const passwordValidation =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^\w\d\s]).{8,}$/;

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .refine((password) => passwordValidation.test(password), {
      message: "Invalid password format",
    }),
});
  
type FormFields = z.infer<typeof schema>;

const LoginForm: React.FunctionComponent = () => {
  const { setToken, profileData, userInfo, decodeToken } = useAuthContext();
  const { toast } = useToast();
  console.log({"PROFILE DATA": profileData})

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: { email: userInfo?.email },
    resolver: zodResolver(schema),
  });
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaEyeSlash />);
  const [isVisible, setIsVisible] = useState(false);

  const password = watch("password", ""); 
  useEffect(() => {
    if (errors.email?.message) {
      toast.error(errors.email.message);
    }
    if (errors.password?.message) {
      toast.error(errors.password.message);
    }
  }, [errors.email, errors.password]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);

    try {
      const response = await api.post("api/token", data);
      console.log(response.data);
      setToken(response.data.access);
      decodeToken(response.data.access);
      reset();
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          setError("root", { message: "No server response" });
          toast.error("No server response");
        } else {
          console.log(err.response?.data);
          toast.error(err.response.data?.message ||err.response.data?.detail || "Login failed");
        }
      } else {
        console.error("Non Axios error:", err);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsVisible(false);
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<FaEye />);
      setType("text");
    } else {
      setIcon(<FaEyeSlash />);
      setType("password");
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-items-center gap-3 w-full">
        <input
          type="text"
          {...register("email")}
          placeholder="email"
          className="border-1 shadow-sm dark:shadow-neutral-800  dark:bg-neutral-700 dark:text-neutral-300  px-4 py-2 rounded-full focus:outline-1"
        />
        <div className="relative">
          <input
            type={type}
            {...register("password")}
            placeholder="Password"
            className="border-1 shadow-sm dark:shadow-neutral-800 dark:bg-neutral-700 dark:text-neutral-300 px-4 py-2 rounded-full focus:outline-1 w-full"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleFocus}
          />
          <span
            className={`absolute top-[12px] z-10 right-[20px] text-white cursor-pointer ${isVisible ? "visible" : "invisible"}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleToggle}
          >
            {icon}
          </span>
        </div>
        {password && (
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital"]}
            minLength={8}
            value={password}
            iconSize={12}
            className="text-xs"
          />
        )}
      </div>
      <Link
        to="/forgot-password"
        className="text-xs text-secondary hover:underline underline-offset-1 self-end"
      >
        Forgot Password
      </Link>
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`w-full mt-3 flex items-center justify-center ${isSubmitting ? "cursor-not-allowed" : ""}`}
      >
        {isSubmitting ? (
          <Oval
            visible={true}
            height="30"
            width="30"
            color="#ffffff"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          "Continue"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
