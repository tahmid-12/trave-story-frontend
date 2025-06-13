import { useEffect } from "react";
import type { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "../../features/auth/auththunks";
import PasswordInput from "../input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { getUser } from "../../features/auth/auththunks";

type AuthFormProps = {
    mode: "login" | "signup";
};

type FormData = {
    email: string;
    password: string;
    fullName?: string;
    retypePassword?: string;
};

const AuthForm = ({ mode }: AuthFormProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>();

    const passwordValue = watch("password");
    const isLogin = mode === "login";


    const { loading, error, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = (data: FormData) => {
        if (isLogin) {
            dispatch(login({ email: data.email, password: data.password }))
                .unwrap()
                .then(() => {
                    dispatch(getUser());
                })
                .catch((err: unknown) => {
                    console.error("Login failed:", err);
                });
        } else {
            dispatch(signUp({ fullName: data.fullName || "", email: data.email, password: data.password }))
                .unwrap()
                .then(() => {
                    navigate("/login");
                })
                .catch((err: unknown) => {
                    console.error("Signup failed:", err);
                });
        }
    };

    return (
        <div className="min-h-screen bg-cyan-50 overflow-hidden flex flex-col md:flex-row justify-center relative">
            <div className="login-ui-box right-10 -top-40" />
            <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />

            <div className="container flex flex-col md:flex-row items-center justify-center px-4 md:px-20 mx-auto w-full">
                {/* Left Section */}
                <div className="w-full md:w-1/2 h-64 md:h-[90vh] flex items-end bg-log-img rounded-t-lg md:rounded-l-lg md:rounded-tr-none z-50 relative">
                    <div className="absolute left-5 top-1/3 md:left-8 md:top-1/2 transform -translate-y-1/2">
                        <p className="text-3xl md:text-5xl text-white font-semibold leading-snug md:leading-[58px]">
                            {isLogin ? (
                                <>
                                    Capture Your <br /> Journeys
                                </>
                            ) : (
                                <>
                                    Join the <br /> Adventure
                                </>
                            )}
                        </p>
                        <p className="text-sm md:text-[15px] text-white leading-6 pr-3 mt-3">
                            {isLogin
                                ? "Record your travel experiences and memories in your personal travel journey"
                                : "Create an account to start your travel journey and share your adventures with the world."}
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 h-auto md:h-[75vh] bg-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none relative p-8 md:p-16 shadow-lg shadow-cyan-200/20">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4 className="text-2xl font-semibold mb-4">{isLogin ? "Log In" : "Sign Up"}</h4>

                        {
                            !isLogin && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        className="input-box"
                                        {...register("fullName", {
                                            required: "Full name is required",
                                            minLength: {
                                                value: 3,
                                                message: "Full name must be at least 3 characters long"
                                            }
                                        })}
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </>

                            )
                        }

                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="input-box"
                            {...register("email", {
                                required: "Email is required",
                                validate: value => validateEmail(value) || "Invalid email format"
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                        <PasswordInput
                            placeholder="Enter Password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

                        {!isLogin && (
                            <>
                                <PasswordInput
                                    placeholder="Retype Password"
                                    {...register("retypePassword", {
                                        required: "Please retype your password",
                                        validate: (value) =>
                                            value === passwordValue || "Passwords do not match",
                                    })}
                                />
                                {errors.retypePassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.retypePassword.message}
                                    </p>
                                )}
                            </>
                        )}

                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

                        <button type="submit" className="btn-primary w-full mt-4" disabled={loading}>
                            {loading ? "Loading..." : isLogin ? "LOGIN" : "SIGN UP"}
                        </button>

                        <p className="text-xs text-slate-500 text-center my-4">Or</p>

                        <button
                            type="button"
                            className="btn-primary btn-light w-full"
                            onClick={() => navigate(isLogin ? "/signin" : "/login")}
                        >
                            {isLogin ? "CREATE ACCOUNT" : "BACK TO LOGIN"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;