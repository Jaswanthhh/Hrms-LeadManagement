import { useNavigate } from "react-router-dom";

const SuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="flex h-full">
          <div className="w-1/2 bg-[#E7F2FF] flex flex-col justify-center px-20 blur-sm">
            <button className="flex items-center text-gray-600 text-sm mb-6">
              <span className="mr-2">←</span> Back
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Enter OTP</h2>
            <p className="text-gray-600 mb-6 text-sm">
              We have sent a code to your registered email address
            </p>
          </div>
          <div className="w-1/2 bg-white">
            <img
              src="/src/assets/verify-otp-illustration.png"
              alt="Background Illustration"
              className="w-full h-full object-contain blur-sm opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Centered Success Message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-[400px] w-[90%] z-10">
          {/* Celebration Icon */}
          <div className="mb-4 flex justify-center">
            <img 
              src="/src/assets/success-icon.png" 
              alt="Success Icon" 
              className="w-36"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Password Updated Successfully
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Your password has been updated successfully.
          </p>

          {/* Back to Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-lg transition-all duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage; 