import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button, { buttonStyles } from "../../../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import api from "../../../../api/api";
import { StepProps } from "../../../../pages/auth/Signup";
import { useAuthContext } from "../../../../context/auth-context";
import PasswordChecklist from "react-password-checklist";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useToast } from "../../../../hooks/useToast";

type FloatingLabelProps = {
  id: string;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onBlur: (value: string) => void;
  initialType: string;
  initialIcon: JSX.Element;
  isVisible: {
    password1: boolean;
    password2: boolean;
  };
  setIsVisible: Dispatch<
    SetStateAction<{
      password1: boolean;
      password2: boolean;
    }>
  >;
  visibilityKey: "password1" | "password2";
};

const FloatingLabelInput = ({
  id,
  label,
  value,
  setValue,
  onBlur,
  visibilityKey,
  initialType,
  initialIcon,
  setIsVisible,
  isVisible,
}: FloatingLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState(initialType);
  const [currentIcon, setCurrentIcon] = useState(initialIcon);

  const handleToggle = () => {
    setIsVisible((prev) => ({
      ...prev,
      [visibilityKey]: !prev[visibilityKey],
    }));

    if (inputType === "password") {
      setInputType("text");
      setCurrentIcon(<FaEye />);
    } else {
      setInputType("password");
      setCurrentIcon(<FaEyeSlash />);
    }
  };

  return (
    <div className="relative h-[60px] mb-4">
      <input
        type={initialType}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(value !== "");
          if (onBlur) {
            onBlur(value);
          }
        }}
        className="px-3 pt-5 w-full h-full border rounded-md bg-transparent outline-none 
                     border-dark-border text-lg focus:ring-2 focus:ring-secondary-100 focus:border-transparent"
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all text-lg dark:text-dark-text ${
          isFocused || value
            ? "top-1 text-sm text-secondary-100"
            : "top-4 text-gray-500"
        }`}
      >
        {label}
      </label>
      <span
        className={`absolute top-[12px] z-10 right-[20px] text-white cursor-pointer ${isVisible[visibilityKey] ? "visible" : "invisible"}`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleToggle}
      >
        {currentIcon}
      </span>
    </div>
  );
};

type PasswordFormProps = StepProps;

const passwordValidation =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^\w\d\s]).{8,}$/;

const PasswordForm: React.FC<Partial<PasswordFormProps>> = ({
  next,
  setLoading,
  updateFormData,
}) => {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isVisible, setIsVisible] = useState({
    password1: false,
    password2: false,
  });

  const [errors, setErrors] = useState({
    password: "",
    cpassword: "",
  });
  const [touched, setTouched] = useState({
    password: false,
    cpassword: false,
  });
  const { setToken, decodeToken } = useAuthContext();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoading?.(true);
    setErrors({ password: "", cpassword: "" });

    if (password.trim() !== cPassword.trim()) {
      setErrors((prev) => ({
        ...prev,
        cpassword: "Both passwords must match",
      }));
      setIsFormValid(false);
      setLoading?.(false);
      return;
    }

    try {
      const response = await api.post("/api/signup/steps/3", {
        password,
        cPassword,
      });
    
      setLoading?.(false);
      updateFormData?.("password", password);
      toast.success("User Account Created successfully");
      setToken(response.data.access);
      decodeToken(response.data.access);
      next?.();
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(error.response.data?.message || error.response.data?.error || "Conflict error occurred.",)
          setErrors((prev) => ({
            ...prev,
            password:
              error.response.data?.message ||
              error.response.data?.error ||
              "Conflict error occurred.",
          }));
        } else {
          toast.error(error.response.data?.message || error.response.data?.error || "Conflict error occurred.",)
          setErrors((prev) => ({
            ...prev,
            password:
              error.response.data?.message ||
              error.response.data?.error ||
              "An unexpected error occurred. Please try again.",
          }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "An unexpected error occurred. Please try again.",
        }));
      }
      console.error(error);
    } finally {
      setLoading?.(false);
    }
    
  };

  useEffect(() => {
    const hasErrors = errors.password || errors.cpassword;
    const isValid =
      password !== "" &&
      cPassword !== "" &&
      password === cPassword &&
      !hasErrors;

    setIsFormValid(isValid);
  }, [password, cPassword, errors]);

  const handleBlur = (field: "password" | "cpassword", value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "password") {
      if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be more than 8 characters",
        }));
        setIsFormValid(false);
      } else if (!passwordValidation.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }));
        setIsFormValid(false);
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    } else if (field === "cpassword") {
      if (value !== password) {
        setErrors((prev) => ({
          ...prev,
          cpassword: "Passwords do not match",
        }));
        setIsFormValid(false);
      } else {
        setErrors((prev) => ({ ...prev, cpassword: "" }));
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col flex-grow">
      <h1 className="dark:text-white font-semibold text-3xl mb-1">
        You'll need a password
      </h1>
      <p className="dark:text-dark-text text-base mb-7">
        Make sure it's 8 characters or more
      </p>
      <FloatingLabelInput
        id="name"
        label="Password"
        value={password}
        setValue={setPassword}
        onBlur={(value) => handleBlur("password", value)}
        initialType="password"
        initialIcon={<FaEyeSlash />}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        visibilityKey="password1"
      />
      {touched.password && errors.password && (
        <p className="text-red-500 text-xs -mt-4">{errors.password}</p>
      )}

      <FloatingLabelInput
        id="email"
        label="Confirm Password"
        value={cPassword}
        setValue={setCPassword}
        onBlur={(value) => handleBlur("cpassword", value)}
        initialType="password"
        initialIcon={<FaEyeSlash />}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        visibilityKey="password2"
      />
      {touched.cpassword && errors.cpassword && (
        <p className="text-red-500 text-xs -mt-4">{errors.cpassword}</p>
      )}
      <PasswordChecklist
        rules={["minLength", "specialChar", "number", "capital", "match"]}
        minLength={8}
        value={password}
        valueAgain={cPassword}
        iconSize={12}
        className="text-xs mb-3 password-checklist"
      />

      <Button
        onClick={handleSubmit}
        type="button"
        disabled={!isFormValid}
        className={twMerge(
          buttonStyles(),
          "w-full py-3 mt-auto font-bold text-white disabled:bg-opacity-60 disabled:cursor-not-allowed hover:bg-opacity-80 disabled:hover:bg-opacity-70"
        )}
      >
        Sign up
      </Button>
    </div>
  );
};

export default PasswordForm;
