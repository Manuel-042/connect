import { Dispatch, SetStateAction, useState } from "react";
import api from "../../../../api/api";

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
            {maxLength && <div className="text-[0.8rem] absolute top-2 right-2 dark:text-dark-text">
                {value.length} / {maxLength}
            </div>}
        </div>
    );
};

interface CreateAccountFormProps {
    onFormValid: (isValid: boolean) => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onFormValid }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        email: ""
    });

    const [isNameFocused, setIsNameFocused] = useState(false);  // Separate focus state
    const [isEmailFocused, setIsEmailFocused] = useState(false); // Separate focus state


    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9.-_+]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleBlur = (id: string, value: string) => {
        let isValid = true;

        if (id === "name") {
            setIsNameFocused(value !== "");
        } else if (id === "email") {
            setIsEmailFocused(value !== "");
        }

        if (id === "name") {
            if (!name) {
                setErrors((prev) => ({ ...prev, name: "Name is required" }));
                isValid = false;
            } else {
                setErrors((prev) => ({ ...prev, name: "" }));
            }
        } else if (id === "email") {
            if (!email) {
                setErrors((prev) => ({ ...prev, email: "Email is required" }));
                isValid = false;
            } else if (!validateEmail(email)) {
                setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
                isValid = false;
            } else {
                api.post('api/token', { email: value })
                    .then((res) => {
                        if (res.data.status === 409) {
                            setErrors((prev) => ({ ...prev, email: "This Email already exists" }));
                            isValid = false;
                        } else if (res.data.status === 400) {
                            setErrors((prev) => ({ ...prev, email: "Invalid Email" }));
                            isValid = false;
                        } else {
                            setErrors((prev) => ({ ...prev, email: "" }));
                        }
                    });
            }
        }

        onFormValid(isValid);
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
        </div>
    );
};

export default CreateAccountForm;
