import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button, { buttonStyles } from "../../../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import useApiPrivate from "../../../../hooks/useApiPrivate";
import { StepProps } from "../../../../pages/auth/Signup";

let debounceTimeout: NodeJS.Timeout;

type FloatingLabelProps = {
    id: string;
    label: string;
    value: string;
    username: string;
    onBlur: (value: string) => void;
    minLength?: number
    maxLength?: number
    setValue: Dispatch<SetStateAction<string>>;
}

const FloatingLabelInput = ({ id, label, value, setValue, username, maxLength, minLength, onBlur }: FloatingLabelProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(e.target.value !== "");
        if (onBlur) {
          onBlur(e.target.value);
        }
    };

    return (
        <div className="relative h-[60px] mb-4">
            <input
                type="text"
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                className="px-3 pt-5 w-full h-full border rounded-md bg-transparent outline-none 
                     border-dark-border text-lg focus:ring-2 focus:ring-secondary-100 focus:border-transparent"
                maxLength={maxLength}
                minLength={minLength}
            />
            <span
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${
                username ? "invisible" : ""
                }`}
            >
                @
            </span>
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

type UsernameFormProps = StepProps

const UsernameForm: React.FC<Partial<UsernameFormProps>> = ({ next, setLoading, updateFormData }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState("");
    const [showMore, setShowMore] = useState(false)
    const [isChecking, setIsChecking] = useState(false); 
    const [isValid, setIsValid] = useState(true); 
    const apiPrivate = useApiPrivate()

    useEffect(() => {
        if (!username) return;

        setIsChecking(true);
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            try {
                const response = await apiPrivate?.post("/api/username/check", { username });
                if (response?.status === 200 && response?.data?.isAvailable) {
                    setErrors("");
                    setIsValid(true);
                } else {
                    setErrors("Username already exists");
                    setIsValid(false);
                }
            } catch (error) {
                console.error(error);
                setErrors("An error occurred. Please try again later.");
                setIsValid(false);
            } finally {
                setIsChecking(false);
            }
        }, 500); // Debounce delay
    }, [username, apiPrivate]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await apiPrivate?.get('/api/username/suggestions');
                console.log(response);
    
                if (response?.status === 200) {
                    setSuggestions(response.data.suggestions);
                    setUsername(response.data.suggestions[0]);
                } else {
                    setErrors('An error occurred. Please try again later.');
                }
            } catch (error) {
                setErrors('An error occurred. Please try again later.');
                console.error(error);
            } finally {
                setLoading?.(false);
            }
        };
    
        fetchSuggestions();
    }, [apiPrivate]); 
    
    const handleSubmit = async () => {
        if (!isValid) return;
        setLoading?.(true);
    
        try {
            const response = await apiPrivate?.post('/api/signup/steps/5', { username: username });
            console.log(response);
            console.log({ username });
    
            if (response?.status === 200) {
                setLoading?.(false);
                updateFormData?.("username", username)
                next?.();
            } else if (response?.status === 400) {
                setErrors(response?.data?.message);
            } else {
                setErrors(response?.data?.error);
            }
        } catch (error) {
            setErrors('An error occurred. Please try again later.');
            console.error(error);
        } finally { 
            setLoading?.(false);
        }
    };

    const onBlur = (value: string) => {
        if (value.length < 4) {
            setErrors("Username cannot be less than four characters")
            setIsValid(false)
        }
    };

    const limit = showMore ? suggestions.length : 3

    return (
        <div className="w-full h-full flex flex-col flex-grow">
            <h1 className="dark:text-white font-semibold text-3xl mb-1">What should we call you?</h1>
            <p className="dark:text-dark-text text-base mb-7">Your @username is unique. You can always change it later.</p>

            <FloatingLabelInput
                id="username"
                label="Username"
                value={username}
                username={username}
                onBlur={onBlur}
                minLength={4}
                maxLength={15}
                setValue={setUsername}
            />
            {errors && <p className="text-red-500 text-xs -mt-2">{errors}</p>}
            {isChecking && <p className="text-red-500 text-xs mt-1">Checking username availability...</p>}

            <p className="text-secondary-100">
                {suggestions.slice(1, limit).map(suggestion => `@${suggestion}`).join(", ")}
            </p>

            {suggestions.length > 3 && (
                <p className="text-secondary-100 mt-3" onClick={() => setShowMore(prev => !prev)}>
                    {showMore ? "Show less" : "Show more"}
                </p>
            )}
            <div className='mt-auto flex gap-3 flex-col'>
                <Button
                    onClick={handleSubmit}
                    type="button"
                    className={twMerge(buttonStyles(), "w-full py-3 font-bold bg-white text-black disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-white hover:bg-opacity-80 disabled:hover:bg-white disabled:hover:bg-opacity-50")}
                    disabled={isChecking || !isValid}
                >
                    Next
                </Button>

                <Button
                    onClick={next}
                    type="button"
                    className={twMerge(buttonStyles(), "w-full py-3 font-bold text-white bg-transparent border border-white disabled:bg-transparent disabled:cursor-not-allowed hover:bg-transparent disabled:hover:bg-transparent")}
                >
                    Skip for now
                </Button>
            </div>


        </div>
    )
}

export default UsernameForm