import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EnterOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef(new Array(6).fill(null));
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "your registered email";

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      alert("OTP Verified ✅");
      navigate("/reset-password");
    } else {
      alert("Please enter a complete 6-digit verification code.");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2 bg-[#E7F2FF] flex flex-col justify-center px-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 text-sm mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Enter OTP</h2>
        <p className="text-gray-600 mb-6 text-sm">
          We have sent a code to your registered email address:
          <br />
          <span className="font-bold">{email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 mb-6 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(ref) => (inputRefs.current[index] = ref)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md bg-white text-black font-bold focus:outline-none focus:border-blue-500"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-md transition-all duration-200"
          >
            Verify
          </button>
        </form>
      </div>

      <div className="w-1/2 bg-white flex justify-center items-center">
        <img
          src="/src/assets/verify-otp-illustration.png"
          alt="Verify OTP"
          className="w-[80%] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default EnterOTP; 