import { useState, forwardRef } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type PasswordInputProps = {
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder, ...rest }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const togglePassword = () => {
      setIsShowPassword((prev) => !prev);
    };

    return (
      <div className="flex items-center bg-cyan-600/5 px-5 rounded mb-3">
        <input
          type={isShowPassword ? "text" : "password"}
          placeholder={placeholder || "Enter Password"}
          className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
          ref={ref}
          {...rest}
        />
        {isShowPassword ? (
          <FaRegEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={togglePassword}
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={togglePassword}
          />
        )}
      </div>
    );
  }
);

export default PasswordInput;