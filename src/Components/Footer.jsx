import { assets } from "../assets/frontend_assets/assets"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-zinc-50">
     {/* bg-zinc-200  bg-slate-50*/}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm p-4">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-32 h-12" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam reiciendis laborum optio necessitatibus delectus, expedita, error vero ut dolorum perspiciatis eum facere quidem voluptas cumque esse neque magnam quis.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">

            <li className="cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/about">About us</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/">Delivery</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/">Privacy policy</Link>
            </li>

          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1 567-(890)-56786</li>
            <li>contact@easyonlinebazzar.com</li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 easyonlinebazzar.com All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
