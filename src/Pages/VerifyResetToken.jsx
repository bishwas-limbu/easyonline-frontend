import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyResetToken = () => {
  const { backend_url, navigate, email_, setResetToken } = useContext(ShopContext);

  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = useState(10);

  // Handle input change for OTP digits
  const handleChange = (index, value) => {
   // Only allow numbers
    const updatedOTP = [...OTPinput];
    updatedOTP[index] = value;
    setOTPinput(updatedOTP);

    // Automatically focus on the next input
    if (value && index < OTPinput.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };



  // Verify the account with the entered OTP
  const verifyAccount = async () => {
    try {
      const optToken = OTPinput.join("").toLowerCase();
      const response = await axios.post(backend_url + "users/verifyResetToken", {
        resettoken: optToken,
      });

      if (response.data.success) {
        setResetToken(optToken);
        navigate("/resetPassword");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Resend OTP functionality
  const resendOTP = async() => {
    console.log("Second");
    if (!disable) {

      console.log("first")
      setTimer(10);
      setDisable(true);
      const response = await axios.post(backend_url + 'users/forgotpassword',
        {
          "email": email_
        }
      )
      console.log(response.data)
      if(response.data.success){
     //   setEmail_(emailInput);
      //  setTest(emailInput)
        toast.success("A new OTP has been sent to your email.")
      //  navigate('/verifyresettoken');
      }else {
        toast.error(response.data.message)
      }
    }
  };
    // Countdown timer for OTP resend
    useEffect(() => {
      if (timerCount > 0) {
        const timer = setTimeout(() => setTimer(timerCount - 1), 1000);
        return () => clearTimeout(timer);
      }
      setDisable(false);
    }, [timerCount]);
  return (
    <div className="h-screen bg-slate-400 flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>{`We have sent a code to your email: ${email_}`}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {OTPinput.map((digit, index) => (
                    <div key={index} className="w-16 h-16 mr-4">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        value={digit}
                        id={`otp-${index}`}
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="button"
                      onClick={verifyAccount}
                      className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-black hover:bg-red-500 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <a
                      href="#"
                      onClick ={resendOTP}
                      className="flex flex-row items-center"
                      style={{

                        color: disable ? "gray" : "blue",
                        cursor: disable ? "not-allowed" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </a>
                    
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetToken;
