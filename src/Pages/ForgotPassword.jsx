import{ useContext, useState,useEffect } from "react";
import {ShopContext} from "../Context/ShopContext"
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const {backend_url,navigate,email_, setEmail_,test,setTest} = useContext(ShopContext);
  const [emailInput, setEmailInput] = useState('');

  const onSubmitHandler =  async(event) => {
    event.preventDefault();
    try{
      console.log("********",emailInput);
      
      const response = await axios.post(backend_url + 'users/forgotpassword',
        {
          "email": emailInput
        }
      )
      console.log(response.data)
      if(response.data.success){
        setEmail_(emailInput);
        setTest(emailInput)
         toast.success(response.data.message)
        navigate('/verifyresettoken');
      }else {
        toast.error(response.data.message)
      }


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
    console.log("email_ has been updated to: ", email_);
    console.log(test)
}, [email_,test]);
  
  
  return (
    <div className="  h-screen bg-slate-400 flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Find your account</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div className="mb-3 min-w-72">
            <p className="tex-sm font-medium text-gray-700 mb-2">
                Please enter your email to search for your account.
            </p>
            <input
              onChange={(e) => setEmailInput(e.target.value)}
              value={emailInput}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:outline-none"
              type="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div>
            <button
                className="mt-5 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-red-500"
                onClick = {() => navigate('/login')}
              >
                Cancel
              </button>
             <button
              className="mt-5 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-red-500"
              type="submit"
            >
              Search
            </button>
          </div>
          {/* <button
            className="mt-5 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-red-500"
            type="submit"
          >
            Login
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
