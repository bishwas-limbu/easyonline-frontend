import { Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
import Collection from "./Pages/Collection" 
import Contact from "./Pages/Contact"
import About from "./Pages/About"
import Login from "./Pages/Login"
import Cart from "./Pages/Cart"
import Product from "./Pages/Product"
import Order from "./Pages/Order"
import PlaceOrder from "./Pages/PlaceOrder"
import Navbar from "./Components/Navbar"
import NotFound from "./Pages/NotFound"
import Footer from "./Components/Footer"
import SearchBar from "./Components/SearchBar"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import StripeVerify from "./Pages/StripeVerify"
import ForgotPassword from "./Pages/ForgotPassword"
import VerifyResetToken from "./Pages/VerifyResetToken"
import ResetPassword from "./Pages/ResetPassword"
import UserProfile from "./Pages/UserProfile"

const App = () => {
  return (
    <>
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
         <Route path ="/" element={<Home />} />
         <Route path ="/collections" element={<Collection />} />
         <Route path ="/about" element={<About />} />
         <Route path ="/contact" element={<Contact />} />
         <Route path ="/login" element={<Login />} />
         <Route path ="/carts" element={<Cart />} />
         <Route path ="/product/:productId" element={<Product />} />
         <Route path ="/orders" element={<Order />} />
         <Route path ="/placeorder" element={<PlaceOrder />} />
         <Route path ="/verify" element={<StripeVerify />} />
         <Route path ="/forgotpassword" element={<ForgotPassword />} />
         <Route path ="/verifyresettoken" element={<VerifyResetToken />} />
         <Route path ="/resetPassword" element={<ResetPassword />} />
         <Route path = "/userprofile" element = {<UserProfile />} />
         <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
      </Routes>
      <Footer />
    </div>
    </>
  )
}

export default App
