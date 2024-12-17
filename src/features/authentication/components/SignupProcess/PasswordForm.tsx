import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button, { buttonStyles } from "../../../../components/UI/Button";
import { twMerge } from "tailwind-merge";

type FloatingLabelProps = {
  id: string;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const FloatingLabelInput = ({ id, label, value, setValue }: FloatingLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative h-[60px] mb-4">
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value !== "")}
        className="px-3 pt-5 w-full h-full border rounded-md bg-transparent outline-none 
                     border-dark-border text-lg focus:ring-2 focus:ring-secondary-100 focus:border-transparent"
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all text-lg dark:text-dark-text ${isFocused || value
          ? "top-1 text-[0.7rem] text-secondary-100"
          : "top-4 text-gray-500"
          }`}
      >
        {label}
      </label>
    </div>
  );
};

type PasswordFormProps = {
  key?: string;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (key: string, value: string) => void;
}


const PasswordForm: React.FC<PasswordFormProps> = ({ next, setLoading, updateFormData }) => {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);


  const handleSubmit = async () => {
    // const success = await api.post('/api/set-password', { password });

    console.log({ password })
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateFormData("password", password)
      next();
    }, 2000);

    // if (success) {
    //     next();
    // }
  };

  useEffect(() => {
    setIsFormValid(password !== "" && cPassword !== "");
  }, [password, cPassword]);


  return (
    <div>
      <h1 className="dark:text-white font-semibold text-3xl mb-1">You'll need a password</h1>
      <p className="dark:text-dark-text text-base mb-7">Make sure it's 8 characters or more</p>
      <FloatingLabelInput
        id="name"
        label="Password"
        value={password}
        setValue={setPassword}
      />
      <FloatingLabelInput
        id="email"
        label="Confirm Password"
        value={cPassword}
        setValue={setCPassword}
      />
      <Button
        onClick={handleSubmit}
        type="button"
        disabled={!isFormValid}
        className={twMerge(buttonStyles(), "w-full py-3 font-bold text-white mt-7 disabled:bg-opacity-60 disabled:cursor-not-allowed hover:bg-opacity-80 disabled:hover:bg-opacity-70")}
      >
        Sign up
      </Button>
    </div>
  );
};

export default PasswordForm;