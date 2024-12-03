import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import NotFound from "./NotFound"

const ResetPassword = () => {

    const{navigate,resetToken,setResetToken,backend_url} = useContext(ShopContext)

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);



  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const changePassword = async() => {
    console.log("C1", newPassword);
    console.log("C2", confirmPassword);
    console.log("resetToken");
    try{
        if (newPassword === confirmPassword) {
           // /resetpassword/:resettoken
           const resettoken = resetToken;
            const url = `${backend_url}users/resetpassword/${resettoken}`
            console.log(url)
           const response = await axios.put(`${backend_url}users/resetpassword/${resettoken}`, {
            "password": newPassword,
           })
           console.log(response.data);
           if(response.data.success){
            setResetToken('');
            toast.success(response.data.message);
            navigate('/login');
           }
        }else{
            toast.error("Passwords do not match");
        }
    }catch(error){
        toast.error(error.response.data.message)
    }
  };
  console.log("resetToekn",resetToken)
  useEffect(() => {
    console.log(newPassword);
    console.log("C2", confirmPassword);
    console.log(showPassword)
  }, [newPassword,confirmPassword,showPassword]);
  return (
    resetToken ? <div className="  h-screen bg-slate-400 flex items-center justify-center w-full">
        <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6  bg-white shadow-md rounded-lg  dark:border md:mt-0 sm:max-w-md sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value = {newPassword}
                  type={showPassword ? "text" : "password"}
                  name="newpassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                ></input>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value = {confirmPassword}
                  type={showPassword ? "text" : "password"}
                  name="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                ></input>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  ></input>
                </div>

                <div className="ml-3 text-sm">
                  <label htmlFor="show Password" className="font-light text-gray-900 ">
                    Show password
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  ></input>
                </div>

                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-900"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline text-gray-900"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </form>
            <button
              onClick={() => changePassword()}
              className="w-full mt-8 text-white bg-black hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </div>
        </div>
    
    </div>:<NotFound />
  );
};

export default ResetPassword;
