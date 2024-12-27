import { forwardRef, InputHTMLAttributes } from "react";
import { clsx } from "~/utils/clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, errorMessage, ...props }, ref) => {
  return (
    <div>
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-500">
        {label}
        <input
          ref={ref}
          {...props}
          className={clsx("h-8 rounded border px-2 font-normal text-black outline-none", props.className)}
        />
      </label>
      {errorMessage && <p className="mt-1 text-sm text-red-500">Please enter a username</p>}
    </div>
  );
});

export default Input;
