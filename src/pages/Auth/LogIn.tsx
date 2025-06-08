import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();


  const onSubmit = (data: FormData) => {
    console.log("Login Data:", data);
    // navigate("/dashboard");
  };



  return (
    <div className="min-h-screen bg-cyan-50 overflow-hidden flex flex-col md:flex-row justify-center relative">

      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />

      <div className="container flex flex-col md:flex-row items-center justify-center px-4 md:px-20 mx-auto w-full">

        <div className="w-full md:w-1/2 h-64 md:h-[90vh] flex items-end bg-log-img rounded-t-lg md:rounded-l-lg md:rounded-tr-none z-50 relative">
          <div className="absolute left-5 top-1/3 md:left-8 md:top-1/2 transform -translate-y-1/2">
            <p className="text-3xl md:text-5xl text-white font-semibold leading-snug md:leading-[58px]">
              Capture Your <br /> Journeys
            </p>
            <p className="text-sm md:text-[15px] text-white leading-6 pr-3 mt-3">
              Record your travel experiences and memories in your personal travel journey
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-auto md:h-[75vh] bg-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none relative p-8 md:p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-2xl font-semibold mb-4">Login</h4>

            <input
              id="login"
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
              {...register("password", {
                required: "Password is required"
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

            <button type="submit" className="btn-primary w-full mt-4">LOGIN</button>

            <p className="text-xs text-slate-500 text-center my-4">Or</p>

            <button
              type="button"
              className="btn-primary btn-light w-full"
              onClick={() => navigate("/signin")}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login