import { ShopContext } from "../Context/ShopContext.jsx"
import { useContext, useEffect,useState } from "react";
import Title from "./title.jsx";
import ProductsItem from "./ProductsItem.jsx"


const NewCollection = () => {

  const {products} = useContext(ShopContext);
  const [newProducts,setNewProducts] = useState([]);


 //to display 10 latest products
  useEffect(() =>{
    if (products) {
        setNewProducts(products.slice(0, 10));
      }
  },[products]);


    //console.log(products);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
            <Title text1 = {'LATEST'} text2 = {'COLLECTIONS'} />

            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia dolores cum, sequi quisquam explicabo repudiandae consequuntur quibusdam reprehenderit similique pariatur cupiditate, optio quam voluptate. Autem deserunt maiores rerum aspernatur a.
            </p>
      </div>
      {/* Rendering products */}
        <div className=" grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                newProducts && newProducts.map((item,index) => (
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

export default NewCollection
