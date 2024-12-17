import { Dispatch, SetStateAction, useState } from "react";
import api from "../../../../api/api";
import Button, { buttonStyles } from "../../../../components/UI/Button";
import { twMerge } from "tailwind-merge";

type FloatingLabelProps = {
    id: string;
    label: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    maxLength?: number;
    onBlur: (id: string, value: string) => void;
    setIsFocused: Dispatch<SetStateAction<boolean>>;
    isFocused: boolean;
};

const FloatingLabelInput = ({
    id,
    label,
    value,
    setValue,
    maxLength,
    onBlur,
    isFocused,
    setIsFocused,
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
            <label
                htmlFor={id}
                className={`absolute left-3 transition-all text-lg dark:text-dark-text ${isFocused || value
                    ? "top-1 text-sm text-secondary-100"
                    : "top-4 text-gray-500"
                    }`}
            >
                {label}
            </label>
            {maxLength && <div className="text-[0.8rem] absolute top-2 right-2 dark:text-dark-text">
                {value.length} / {maxLength}
            </div>}
        </div>
    );
};

type CreateAccountFormProps = {
    key?: string;
    next: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccountForm: React.FC<CreateAccountFormProps>= ({ next, setLoading }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        email: ""
    });

    const [isNameFocused, setIsNameFocused] = useState(false); 
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9.-_+]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Function to validate the entire form
    const validateForm = (updatedErrors: { name: string, email: string}) => {
        const isNameValid = !updatedErrors.name;   
        const isEmailValid = !updatedErrors.email;
        setIsFormValid(isNameValid && isEmailValid);
    };

    const validateField = async (id: string, value: string) => {
        let updatedErrors = { ...errors };
    
        if (id === "name") {
            updatedErrors.name = value ? "" : "Name is required";
        }
    
        if (id === "email") {
            if (!value) {
                updatedErrors.email = "Email is required";
            } else if (!validateEmail(value)) {
                updatedErrors.email = "Please enter a valid email";
            } else {
                // try {
                //     setLoading(true);
                //     const res = await api.post("api/validate-email", { email: value });
                //     if (res.data.status === 409) {
                //         updatedErrors.email = "This Email already exists";
                //     } else if (res.data.status === 400) {
                //         updatedErrors.email = "Invalid Email";
                //     } else {
                //         updatedErrors.email = "";
                //     }
                // } catch (error) {
                //     updatedErrors.email = "Error validating email";
                // } finally {
                //     setLoading(false);
                // }
            }
        }
    
        setErrors(updatedErrors);
        validateForm(updatedErrors); // Revalidate form
    };
    

    const handleBlur = (id: string, value: string) => {

        validateField(id, value)

        if (id === "name") {
            setIsNameFocused(value !== "");
        } else if (id === "email") {
            setIsEmailFocused(value !== "");
        }
    };

    const handleSubmit = async () => {
        // const success = await api.post('/api/register', { name, email });

        console.log({name, email})
        setLoading(true);
        setTimeout(() => {
            setLoading(false); 
            next();
        }, 2000);

        // if (success) {
        //     next();
        // }
    };

    return (
        <div>
            <h1 className="dark:text-white font-semibold text-3xl mb-8">Create your account</h1>
            <FloatingLabelInput
                id="name"
                label="Name"
                value={name}
                setValue={setName}
                maxLength={50}
                onBlur={handleBlur}
                setIsFocused={setIsNameFocused}
                isFocused={isNameFocused}
            />
            {errors.name && <p className="text-red-500 text-xs -mt-4">{errors.name}</p>}

            <FloatingLabelInput
                id="email"
                label="Email"
                value={email}
                setValue={setEmail}
                onBlur={handleBlur}
                setIsFocused={setIsEmailFocused}
                isFocused={isEmailFocused}
            />
            {errors.email && <p className="text-red-500 text-xs -mt-4">{errors.email}</p>}

            <Button
                onClick={handleSubmit}
                type="button"
                disabled={!isFormValid}
                className={twMerge(buttonStyles(), "w-full py-3 font-bold bg-white text-black mt-7 disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-white hover:bg-opacity-80 disabled:hover:bg-white disabled:hover:bg-opacity-50")}
            >
                Next
            </Button>
        </div>
    );
};

export default CreateAccountForm;
