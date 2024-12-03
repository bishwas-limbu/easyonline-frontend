import { assets } from "../assets/frontend_assets/assets"
import NewsLetterBox from "../Components/NewsLetterBox"
import Title from "../Components/title.jsx" 


function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            We are a team of passionate individuals who are dedicated to creating innovative and effective solutions for our clients
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem maxime recusandae quae ipsam repellat illum porro numquam voluptates! Esse saepe veritatis dignissimos harum voluptatem odit voluptatum repellendus ratione nemo perferendis!
          </p>
          <b className="text-gray-800">
            Our Mission
          </b>
          <p>
          Our mission is to provide exceptional service, build long-lasting relationships, and make a positive impact on world.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea iure tenetur, asperiores nobis commodi quis unde natus pariatur dicta quaerat ab fugit at libero nemo saepe dolorem quas dignissimos!
          </p>
        </div> 
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea iure tenetur, asperiores nobis commodi quis unde natus pariatur dicta quaerat ab fugit at libero nemo saepe dolorem quas dignissimos!
          </p>
        </div> 
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>supportive Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea iure tenetur, asperiores nobis commodi quis unde natus pariatur dicta quaerat ab fugit at libero nemo saepe dolorem quas dignissimos!
          </p>
        </div> 
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
