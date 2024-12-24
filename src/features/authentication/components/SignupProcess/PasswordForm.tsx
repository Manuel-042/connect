import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button, { buttonStyles } from "../../../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import api from "../../../../api/api";
import { StepProps } from "../../../../pages/auth/Signup";
import { useAuthContext } from "../../../../context/auth-context";

type FloatingLabelProps = {
  id: string;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onBlur: (value: string) => void;
}

const FloatingLabelInput = ({ id, label, value, setValue, onBlur }: FloatingLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative h-[60px] mb-4">
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => { setIsFocused(value !== ""); if (onBlur) { onBlur(value) } }}
        className="px-3 pt-5 w-full h-full border rounded-md bg-transparent outline-none 
                     border-dark-border text-lg focus:ring-2 focus:ring-secondary-100 focus:border-transparent"
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all text-lg dark:text-dark-text ${isFocused || value
          ? "top-1 text-sm text-secondary-100"
          : "top-4 text-gray-500"
          }`}
      >
        {label}
      </label>
    </div>
  );
};

type PasswordFormProps = StepProps

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const PasswordForm: React.FC<Partial<PasswordFormProps>> = ({ next, setLoading, updateFormData }) => {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    cpassword: ""
  });
  const [touched, setTouched] = useState({
    password: false,
    cpassword: false,
  });
  const { setToken, decodeToken } = useAuthContext();


  const handleSubmit = async () => {
    setLoading?.(true);
    setErrors({ password: "", cpassword: "" }); 
  
    if (password.trim() !== cPassword.trim()) {
      setErrors((prev) => ({
        ...prev,
        cpassword: "Both passwords must match",
      }));
      setIsFormValid(false);
      setLoading?.(false); // Stop loading on error
      return;
    }
  
    try {
      const response = await api.post("/api/signup/steps/3", {
        password: password,
        cpassword: cPassword,
      });
  
      if (response.status === 201) {
        setLoading?.(false);
        updateFormData?.("password", password);
        setToken(response.data.access);
        decodeToken(response.data.access);
        next?.();
      } else if (response.status === 409) {
        setErrors((prev) => ({
          ...prev,
          password: response?.data?.message || response?.data?.error || "Conflict error occurred.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          password: response?.data?.message || response?.data?.error || "An unexpected error occurred. Please try again.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        password: "An unexpected error occurred. Please try again.",
      }));
      console.error(error);
    } finally {
      setLoading?.(false);
    }
  };
  
  useEffect(() => {
    const hasErrors = errors.password || errors.cpassword;
    const isValid =
      password !== "" && cPassword !== "" && password === cPassword && !hasErrors;
  
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
      <h1 className="dark:text-white font-semibold text-3xl mb-1">You'll need a password</h1>
      <p className="dark:text-dark-text text-base mb-7">Make sure it's 8 characters or more</p>
      <FloatingLabelInput
        id="name"
        label="Password"
        value={password}
        setValue={setPassword}
        onBlur={(value) => handleBlur("password", value)}
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
      />
      {touched.cpassword && errors.cpassword && (
        <p className="text-red-500 text-xs -mt-4">{errors.cpassword}</p>
      )}  

      <Button
        onClick={handleSubmit}
        type="button"
        disabled={!isFormValid}
        className={twMerge(buttonStyles(), "w-full py-3 mt-auto font-bold text-white disabled:bg-opacity-60 disabled:cursor-not-allowed hover:bg-opacity-80 disabled:hover:bg-opacity-70")}
      >
        Sign up
      </Button>
    </div>
  );
};

export default PasswordForm;