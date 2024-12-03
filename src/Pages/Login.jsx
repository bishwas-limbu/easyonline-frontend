import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const {
    token,
    setToken,
    navigate,
    backend_url,
    currentState,
    setCurrentState,
  } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    streetName: "",
    cityName: "",
    stateName: "",
    zipCode: "",
    countryName: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  console.log("current state", currentState);
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(phoneNumber);
  console.log(address.streetName);
  console.log(address.cityName);
  console.log(address.stateName);
  console.log(address.zipCode);
  console.log(address.countryName);
  console.log(backend_url + "users/register");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backend_url + "users/register", {
          fName,
          lName,
          email,
          phoneNumber,
          password,
          address,
        });
        console.log(response.data);
        if (response.data.success) {
          setFName("");
          setLName("");
          setEmail("");
          setPassword("");
          setPhoneNumber("");
          setAddress({ streetName: "", cityName: "", stateName: "", zipCode: "", countryName:""});
          toast.success(response.data.message);
          setCurrentState('LOGIN');
          navigate("/login")

        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backend_url + "users/login", {
          email,
          password,
        });
        console.log(response.data);
        if (response.data.status) {
          toast.success(response.data.message);
          setToken(response.data.data);
          console.log("token", response.data.data);
          localStorage.setItem("token", response.data.data);
          // setCartProducts({});
          // window.location.reload();

          // navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={submitHandler}
      className="min-h-screen flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-1 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "LOGIN" ? (
        ""
      ) : (
        <div className="flex gap-3 w-full">
          <input
            onChange={(e) => setFName(e.target.value)}
            value={fName}
            className=" rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={(e) => setLName(e.target.value)}
            value={lName}
            className=" rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
        type="email"
        placeholder="Email"
        required
      />

      {currentState === "LOGIN" ? (
        ""
      ) : (
        <>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className=" rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
            type="number"
            placeholder="Phone Number"
            required
          />
          <input
            onChange={handleChange}
            name="streetName"
            value={address.streetName}
            className=" rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
            type="text"
            placeholder="Street Name"
            required
          />
          <div className="flex gap-3 w-full">
            <input
              onChange={handleChange}
              name="cityName"
              value={address.cityName}
              className=" rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
              type="text"
              placeholder="City"
              required
            />
            <input
              onChange={handleChange}
              value={address.stateName}
              name="stateName"
              className=" rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
              type="text"
              placeholder="State"
              required
            />
          </div>
          <div className="flex gap-3 w-full">
            <input
              onChange={handleChange}
              name="zipCode"
              value={address.zipCode}
              className=" rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
              type="number"
              placeholder="zip code"
              required
            />
            <input
              onChange={handleChange}
              value={address.countryName}
              name="countryName"
              className=" rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
              type="text"
              placeholder="Country"
              required
            />
          </div>
        </>
      )}

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className=" rounded focus:outline-none w-full px-3 py-2 border border-gray-800"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        required
      />
      {currentState === "LOGIN" ? (
        ""
      ) : (
        <div className=" w-full flex mb-3">
          <div className="flex items-center h-5">
            <input
              checked={showPassword}
              onChange={togglePasswordVisibility}
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            ></input>
          </div>

          <div className="ml-3 text-sm">
            <label
              htmlFor="show Password"
              className="font-light text-gray-900 "
            >
              Show password
            </label>
          </div>
        </div>
      )}

      <div className="text-sm w-full flex justify-between mt-[-8px]">
        <p
          onClick={() => navigate("/forgotpassword")}
          className="cursor-pointer"
        >
          Forgot Password?
        </p>
        {currentState === "LOGIN" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("LOGIN")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="rounded bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "LOGIN" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
