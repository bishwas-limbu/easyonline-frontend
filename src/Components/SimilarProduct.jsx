import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from "./title";
import ProductsItem from "./ProductsItem";


const SimilarProduct = ({category,subCategory}) => {
  
    const{products} = useContext(ShopContext);
    const[similarProducts,setSimilarProducts]= useState([]);

    useEffect(()=>{
        if(products.length > 0){
            let allProducts = products.slice();

            allProducts = allProducts.filter((item) => category === item.category);

            allProducts = allProducts.filter((item) => subCategory === item.subCategory);
          
            setSimilarProducts(allProducts.slice(0,5));
           // console.log(allProducts.slice(0,5));
        }
    },[products])
  return (
 
      <div className="my-24">
        <div className="text-center text-3xl py-2">
            <Title text1 = {'SIMILAR'} text2={'PRODUCTS'}/>
        </div>
        <div className="
            grid grid-col-2 sm:grid-cols-3 md:grid-cols-4
            lg:grid-cols-5 gap-4 gap-y-6
        ">
            {
                similarProducts.map((product, index) => (
                    <ProductsItem 
                        key={index}
                        id = {product._id}
                        image = {product.image}
                        name={product.name}
                        price = {product.price}
                    
                    />
                ))
            }
        </div>
      </div>
 
  )
}

export default SimilarProduct
