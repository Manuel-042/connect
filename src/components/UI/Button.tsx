import { VariantProps, cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(["transition-colors"], {
    variants: {
        variant: {
            default: ["bg-secondary","hover:bg-secondary-hover", "text-secondary-text"]
        },
        size: {
            default: ["rounded-full", "px-4", "py-2"],
            icons: ["rounded-full","w-10","h-10","flex","items-center","justify-center","p-2.5"]
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
        className={twMerge(className, buttonStyles({ variant, size }))}
    />
  )
};

export default Button;