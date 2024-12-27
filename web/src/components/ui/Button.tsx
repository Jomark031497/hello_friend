import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { clsx } from "~/utils/clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <button ref={ref} {...props} className={clsx("h-8 rounded border text-sm font-medium", props.className)}>
      {children}
    </button>
  );
});

export default Button;
