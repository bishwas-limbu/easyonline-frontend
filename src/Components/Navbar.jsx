import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";

// import { FaRegUser } from "react-icons/fa";
// import { IoBagOutline } from "react-icons/io5";.js
import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    cartCount,
    navigate,
    token,
    setToken,
    cartProducts,
    setCartProducts,
    setCurrentState,
  } = useContext(ShopContext);
  const logout = () => {
    setCurrentState("LOGIN");
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Logout Successfully.");
    setCartProducts({});
    console.log("logout", cartProducts);
  };

  return (
    <div className=" bg-zinc-50 flex items-center justify-between py-5  px-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-40 h-12" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className=" flex flex-col items-center gap-1 ">
          <p className="font-bold"> HOME </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink
          to="/collections"
          className=" flex flex-col items-center gap-1 "
        >
          <p className="font-bold"> COLLECTION </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className=" flex flex-col items-center gap-1 ">
          <p className="font-bold"> ABOUT </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className=" flex flex-col items-center gap-1 ">
          <p className="font-bold"> CONTACT </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* <span onClick = {() => setDisplaySearch(true)} className=' searchSize w-5  cursor-pointer'><IoSearchOutline/></span> */}
        <img
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt=""
        />
        <div className="group relative">
          {/* <span className=' profileSize w-5  cursor-pointer'><FaRegUser /></span> */}

          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />
          {/* for down menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p
                  onClick={() => navigate("/userprofile")}
                  className="cursor-pointer hover:text-black "
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        {token ? (
          <Link to="/carts" className="relative">
            {/* <span className=' cartSize w-5  cursor-pointer'><IoBagOutline /></span> */}
            <img className="w-5 cursor-pointer" src={assets.cart_icon} alt="" />
            <p
              className="absolute right-[-5px] bottom-[-5px] w-3 h-4 text-center 
                            leading-4 bg-red-500 text-white aspect-square rounded-full text-[10px]"
            >
              {cartCount()}
            </p>
          </Link>
        ) : (
          <Link to="/login" className="relative">
            {/* <span className=' cartSize w-5  cursor-pointer'><IoBagOutline /></span> */}
            <img className="w-5 cursor-pointer" src={assets.cart_icon} alt="" />
            <p
              className="absolute right-[-5px] bottom-[-5px] w-3 h-4 text-center 
                            leading-4 bg-red-500 text-white aspect-square rounded-full text-[10px]"
            >
              0
            </p>
          </Link>
        )}
        {/* <span className=' cartSize w-5  cursor-pointer'><IoBagOutline /></span> */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* sidebar menu for samll screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-slate-50 transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div
          onClick={() => setVisible(false)}
          className="flex flex-col text-grey-600"
        >
          <div className="flex items-center gap-4 p-3">
            <img
              src={assets.dropdown_icon}
              alt=""
              className="h-4 rotate-180 cursor-pointer"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collections"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6  border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
