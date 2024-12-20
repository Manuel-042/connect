import { Dispatch, SetStateAction, useState } from "react";
import api from "../../../../api/api";
import Button, { buttonStyles } from "../../../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import { StepProps } from "../../../../pages/auth/Signup";
import { Oval } from "react-loader-spinner";
import { AxiosError } from "axios";

type FloatingLabelProps = {
    id: string;
    label: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    maxLength?: number;
    onBlur: (id: string, value: string) => void;
    setIsFocused: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    isFocused: boolean;
    valid: boolean | null;
};

const FloatingLabelInput = ({
    id,
    label,
    value,
    setValue,
    maxLength,
    onBlur,
    isFocused,
    loading,
    setIsFocused,
    valid,
}: FloatingLabelProps) => {
    return (
        <div className="relative h-[60px] mt-2 mb-4">
            <input
                type="text"
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => onBlur(id, value)} // Pass id and value
                maxLength={maxLength}
                className="px-3 pt-5 w-full h-full border rounded-md bg-transparent outline-none 
                     border-dark-border text-lg focus:ring-2 focus:ring-secondary-100 focus:border-transparent autofill:bg-transparent 
                    autofill:text-white"
            />
            {loading ? (
                <div className="absolute top-5 right-4">
                    <Oval
                        visible={true}
                        height="20"
                        width="20"
                        color="#ffffff"
                        ariaLabel="oval-loading"
                    />
                </div>
            ) : valid === true ? (
                <div className="absolute top-5 right-4 border rounded-full text-xs text-white bg-green-700 border-green-700">
                    ✔
                </div>
            ) : valid === false ? (
                <div className="absolute top-5 right-4 border rounded-full text-xs text-white bg-red-700 border-red-700">
                    ✖
                </div>
            ) : null}
            <label
                htmlFor={id}
                className={`absolute left-3 transition-all text-lg dark:text-dark-text ${isFocused || value
                        ? "top-1 text-sm text-secondary-100"
                        : "top-4 text-gray-500"
                    }`}
            >
                {label}
            </label>
            {maxLength && (
                <div className="text-[0.8rem] absolute top-2 right-2 dark:text-dark-text">
                    {value.length} / {maxLength}
                </div>
            )}
        </div>
    );
};

const CreateAccountForm: React.FC<Partial<StepProps>> = ({ next, setLoading, updateFormData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({ name: "", email: "" });

    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);
    const [validationLoading, setValidationLoading] = useState(false);
    const [validEmail, setValidEmail] = useState<boolean | null>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validateForm = (updatedValidEmail: boolean | null, updatedErrors: typeof errors) => {
        const isNameValid = !updatedErrors.name;
        const isEmailValid = updatedValidEmail === true && !updatedErrors.email;

        console.log("Is Valid Email:", updatedValidEmail);
        console.log("Is Email field error:", !updatedErrors.email);
        console.log("Is Form Valid:", isNameValid && isEmailValid);

        setIsFormValid(isNameValid && isEmailValid);
    };

    const validateField = async (id: string, value: string) => {
        let updatedErrors = { ...errors };
        let updatedValidEmail = validEmail;

        if (id === "name") {
            updatedErrors.name = value ? "" : "Name is required";
        }

        if (id === "email") {
            if (!value) {
                updatedErrors.email = "Email is required";
                updatedValidEmail = false;
            } else if (!validateEmail(value)) {
                updatedErrors.email = "Please enter a valid email";
                updatedValidEmail = false;
            } else {
                try {
                    setValidationLoading(true);
                    const res = await api.post("api/email_validation", { email: value });
                    if (res.status === 200) {
                        updatedValidEmail = true;
                        updatedErrors.email = "";
                    } else {
                        updatedValidEmail = false;
                        updatedErrors.email = "Invalid or already registered email";
                    }
                } catch (error) {
                    updatedValidEmail = false;
                    updatedErrors.email =
                        error instanceof AxiosError
                            ? error.response?.data?.error || "Error validating email"
                            : "Unexpected error occurred";
                } finally {
                    setValidationLoading(false);
                }
            }
        }

        console.log("Errors:", updatedErrors);
        console.log("Valid Email:", updatedValidEmail);

        setErrors(updatedErrors);
        setValidEmail(updatedValidEmail);

        // Pass the updated values directly to validateForm
        validateForm(updatedValidEmail, updatedErrors);
    };


    const handleBlur = (id: string, value: string) => {
        validateField(id, value);
        if (id === "name") setIsNameFocused(value !== "");
        if (id === "email") setIsEmailFocused(value !== "");
    };

    const handleSubmit = async () => {
        setLoading?.(true);
        let updatedErrors = { ...errors };

        try {
            const response = await api.post("api/signup/steps/1", { name: name, email: email });
            console.log(response);

            if (response.status === 200) {
                setLoading?.(false);
                updateFormData?.("name", name);
                updateFormData?.("email", email);
                next?.();
            } else {
                setLoading?.(false);
                updatedErrors.email = response.data.message;
                setErrors(updatedErrors);
            }
        } catch (error) {
            setLoading?.(false);
            console.error(error);
            updatedErrors.email = JSON.stringify(error);
            setErrors(updatedErrors);
        } finally {
            setLoading?.(false);
        }
    };


    return (
        <div className="w-full h-full flex flex-col flex-grow">
            <h1 className="dark:text-white font-semibold text-3xl mb-8">
                Create your account
            </h1>
            <FloatingLabelInput
                id="name"
                label="Name"
                value={name}
                setValue={setName}
                maxLength={50}
                onBlur={handleBlur}
                setIsFocused={setIsNameFocused}
                loading={false}
                isFocused={isNameFocused}
                valid={null}
            />
            {errors.name && <p className="text-red-500 text-xs -mt-4">{errors.name}</p>}

            <FloatingLabelInput
                id="email"
                label="Email"
                value={email}
                setValue={setEmail}
                onBlur={handleBlur}
                setIsFocused={setIsEmailFocused}
                loading={validationLoading}
                isFocused={isEmailFocused}
                valid={validEmail}
            />
            {errors.email && <p className="text-red-500 text-xs -mt-4">{errors.email}</p>}

            <Button
                onClick={handleSubmit}
                type="button"
                disabled={!isFormValid || validationLoading}
                className={twMerge(
                    buttonStyles(),
                    "w-full py-3 font-bold bg-white text-black mt-auto disabled:bg-opacity-50 disabled:cursor-not-allowed"
                )}
            >
                Next
            </Button>
        </div>
    );
};

export default CreateAccountForm;
