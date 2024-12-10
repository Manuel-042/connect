import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    email: string;
}

const VerifyAccountForm = ({ email }: Props) => {
    const length = 6;
    const [otpValues, setOtpValues] = useState(Array(length).fill(""));

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
        </div>
    );
};

export default VerifyAccountForm;
