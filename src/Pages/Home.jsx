import { useEffect } from "react"
import HeroSection from "../Components/HeroSection"
import NewCollection from "../Components/NewCollection"
import NewsLetterBox from "../Components/NewsLetterBox"
import Policy from "../Components/Policy"
import TopSeller from "../Components/TopSeller"


function Home() {

  return (
    <div>
      <HeroSection />
     
      <TopSeller />
      <NewCollection />
      <Policy />
      <NewsLetterBox />
    </div>
  )
}

export default Home
