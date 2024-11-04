import { VariantProps, cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transition-colors"], {
    variants: {
        variant: {
            default: ["bg-secondary","hover:bg-secondary-hover", "text-secondary-text"],
            ghost: ["hover:bg-gray-100", "dark:hover:bg-[#232323]", "dark:focus:bg-[#232323]", "text-black", "dark:text-neutral-300"],
            blueghost: ["hover:bg-primary", "hover:bg-opacity-10", "text-primary"]
        },
        size: {
            default: ["rounded-full", "px-4", "py-2"],
            icon: ["rounded-full","w-10","h-10","flex","items-center","justify-center","p-2.5"],
            navicon: ["rounded-full","flex","items-center","justify-center", "text-2xl"]
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
})

type ButtonProps = VariantProps<typeof buttonStyles> & React.ComponentPropsWithoutRef<"button">

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const { variant, size, className, ...rest } = props
  return (
    <button 
        {...rest} 
        className={twMerge(buttonStyles({ variant, size }), className)}
    />
  )
};

export default Button;