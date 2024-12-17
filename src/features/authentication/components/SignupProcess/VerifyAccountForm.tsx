import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../api/api";
import Button, { buttonStyles } from "../../../../components/UI/Button";
import { twMerge } from "tailwind-merge";

type VerifyAccountFormProps = {
    key?: string;
    next: () => void;
    email: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormData: (key: string, value: string) => void;
}

const VerifyAccountForm: React.FC<VerifyAccountFormProps>= ({ next, email, setLoading, updateFormData }) => {
    const length = 6;
    const [otpValues, setOtpValues] = useState(Array(length).fill(""));
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const updatedOtp = [...otpValues];
        updatedOtp[index] = value;
        setOtpValues(updatedOtp);

        if (value.trim() && index < length - 1) {
            const nextField = document.getElementById(`otp-${index + 1}`);
            nextField?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (otpValues[index] === "" && index > 0) {
                const prevField = document.getElementById(`otp-${index - 1}`);
                prevField?.focus();
            }

            const updatedOtp = [...otpValues];
            updatedOtp[index] = "";
            setOtpValues(updatedOtp);
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = event.clipboardData.getData("text").slice(0, length);
        const updatedOtp = [...otpValues];

        pastedData.split("").forEach((char, i) => {
            if (i < length) {
                updatedOtp[i] = char;
            }
        });

        setOtpValues(updatedOtp);

        const nextIndex = Math.min(pastedData.length, length - 1);
        const nextField = document.getElementById(`otp-${nextIndex}`);
        nextField?.focus();
    };

    const handleSubmit = async () => {
        // const success = await api.post('/api/verify-otp', { otpValues });
        // if (success) {
        //     next();
        // }

        console.log({otpValues})
        setLoading(true);
        setTimeout(() => {
            setLoading(false); 
            updateFormData("otp", otpValues.toString());
            next();
        }, 2000);

    };

    useEffect(() => {
        setIsFormValid(otpValues.join("").length === 6);
    }, [otpValues]);

    return (
        <div>
            <h1 className="dark:text-white font-semibold text-3xl mb-1">We sent you a code</h1>
            <p className="dark:text-dark-text text-base mb-7">Enter it below to verify <span>{email}</span></p>
            <div className="flex flex-row justify-items-center gap-2 w-full mb-3">
                {otpValues.map((value, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-16 border border-dark-border shadow-sm dark:shadow-neutral-800 bg-transparent dark:text-white px-1 py-3 text-center text-3xl font-bold rounded-md outline-none focus:ring-2 focus:ring-secondary-100 focus:border-transparent"
                    />
                ))}
            </div>
            <Link to="/i/flow/signup" className="mt-6 text-secondary-100">Didn't recieve email?</Link>

            <Button
                onClick={handleSubmit}
                type="button"
                disabled={!isFormValid}
                className={twMerge(buttonStyles(), "w-full py-3 font-bold bg-white text-black mt-14 disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-white hover:bg-opacity-80 disabled:hover:bg-white disabled:hover:bg-opacity-50")}
            >
                Next
            </Button>

        </div>
    );
};

export default VerifyAccountForm;
