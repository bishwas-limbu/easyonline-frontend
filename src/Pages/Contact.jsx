import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../Components/NewsLetterBox";
import Title from "../Components/title"


function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
          <Title text1={'CONTACT'} text2={'US'}/>
          
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="rounded bg-gray-400 w-full md:max-w-[480px]" src={assets.contact} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
            <p className="font-semibold text-xl text-gray-600">Our Store</p>
            <p className="text-gray-500">
              807 N Sprigg Street <br/>
              Cape Girardeau, MO 63701
            </p>
            <p className="text-gray-500">
              Tel: 573-730-5780 <br/>
              Email: info@easyonlinebazzar.com
            </p>
            <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
            <p className="text-gray-500">
              Learn more about our teams and jobs openings.
            </p>
            <button className="
                border border-black px-8 py-4 text-sm hover:bg-black
                hover:text-white transition-all duration-500
            ">
                Learn More
            </button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact;
