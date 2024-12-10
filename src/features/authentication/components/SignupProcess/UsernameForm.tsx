import { Dispatch, SetStateAction, useState } from "react";

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


const UserNameForm = () => {
    const [username, setUsername] = useState("");
    return (
        <div>
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

        </div>
    )
}

export default UserNameForm