import { useContext, useEffect, useState} from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from "./title";
import ProductsItem from "../Components/ProductsItem";


function TopSeller() {
  const {products} = useContext(ShopContext);
  const [topSeller,setTopSeller] = useState([]);

  useEffect(()=>{
    if(products){
      console.log(products);
     const topProduct = products.filter((item) =>(item.bestSeller));
     setTopSeller(topProduct.slice(0,5));
     console.log(topProduct)
    }
  },[products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLER'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor accusamus officia repellat pariatur ut voluptatibus quia itaque ducimus vel modi, perspiciatis fugit tempora, ipsa, temporibus praesentium. Explicabo sit saepe autem.
        </p>
      </div>
      <div className=" grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                topSeller && topSeller.map((item,index) => (
                    <ProductsItem 
                    key={index}
                    id = {item._id}
                    title = {item.title}
                    price = {item.price}
                    image = {item.image}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default TopSeller
