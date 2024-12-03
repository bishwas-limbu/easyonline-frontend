import { useContext,useEffect,useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyResetToken = () => {

  const { backend_url,navigate,email_,resetToken, setResetToken } = useContext(ShopContext);

  
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = useState(10);
  
  console.log(OTPinput)
  console.log("forgot token", email_);
  
  
  const verifyAccount = async () => {
    try{
      const optToken = OTPinput.join('').toLowerCase();
      console.log(optToken)
      const response = await axios.post(
        backend_url + 'users/verifyResetToken',
        {
          "resettoken" : optToken
        }
      );
      if(response.data.success){
        setResetToken(OTPinput.join('').toLowerCase())

      }
      //console.log(response.data.success)
      //console.log("resetToekn",resetToken)
      navigate('/resetPassword');
    }catch(error){
      if (axios.isAxiosError(error)) {
        // Check if the error response exists
        if (error.response) {
          // Log the status code and response data
          console.error("Error status:", error.response.status);
          console.log("Error data:", error.response.data.message);
          toast.error(error.response.data.message);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
    
  }

  useEffect(() => {
    if (disable && timerCount > 0) {
      const timer = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timerCount === 0) {
      setDisable(false);
    }
  }, [disable, timerCount]);
  return (
    <div className="  h-screen bg-slate-400 flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>{`We have sent a code to your email:  ${email_}`}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between  mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 mr-4">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          e.target.value,
                          OTPinput[1],
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 mr-4">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          e.target.value,
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 mr-4">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          e.target.value,
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          OTPinput[2],
                          e.target.value,
                        ])
                      }
                    ></input>
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <a
                      onClick ={verifyAccount}
                      className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-black hover:bg-red-500 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </a>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
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
