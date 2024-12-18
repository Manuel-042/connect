import { Dispatch, SetStateAction, useState } from "react";
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

type UsernameFormProps = {
    key?: string;
    next: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormData: (key: string, value: string) => void;
}


const UsernameForm: React.FC<UsernameFormProps> = ({ next, setLoading, updateFormData }) => {
    const [username, setUsername] = useState("");

    const handleSubmit = async () => {
        // const success = await api.post('/api/set-password', { password });
        console.log({ username })
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            updateFormData("username", username)
            next();
        }, 2000);

        // if (success) {
        //     next();
        // }
    };

    return (
        <div className="w-full h-full flex flex-col flex-grow">
            <h1 className="dark:text-white font-semibold text-3xl mb-1">What should we call you?</h1>
            <p className="dark:text-dark-text text-base mb-7">Your @username is unique. You can always change it later.</p>

            <FloatingLabelInput
                id="username"
                label="Username"
                value={username}
                setValue={setUsername}
            />

            <p className="text-secondary-100">@Suggestion1, @Suggestion2</p>
            <p className="text-secondary-100 mt-3">Show more</p>


            <div className='mt-auto flex gap-3 flex-col'>
                <Button
                    onClick={handleSubmit}
                    type="button"
                    className={twMerge(buttonStyles(), "w-full py-3 font-bold bg-white text-black disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-white hover:bg-opacity-80 disabled:hover:bg-white disabled:hover:bg-opacity-50")}
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