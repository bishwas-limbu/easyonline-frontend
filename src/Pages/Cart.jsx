import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from '../Components/title' 
import { assets } from "../assets/frontend_assets/assets";
import TotalCart from "../Components/TotalCart";
import NotFound from "./NotFound"


function Cart() {
  const {navigate,products,cartCount, token,currency, cartProducts,updateCartQuantity} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  console.log("1",cartCount())
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login page
    }
  }, [token, navigate])

  useEffect(() => {
    if(products.length > 0){
      const tempCartData = [];

      for (const items in cartProducts) {
        for (const item in cartProducts[items]) {
          
          if(cartProducts[items][item] > 0){
            tempCartData.push({
              _id:items,
              size:item,
              quantity:cartProducts[items][item],
            });
          }
        }
      }

      //console.log("tempdata",tempCartData);
      setCartData(tempCartData);
    }

  },[cartProducts,products,token,])

 return (

    <div className="border-t pt-14">
      {
        cartCount() === 0 ? 
        <div className="w-full flex justify-center">
          <button onClick={()=> navigate('/collections')} className=" rounded bg-black text-white text-sm my-8 px-3 py-3 ">
            Go to Shopping
          </button>
        </div>
        :    
        <>
          <div className="text-2xl mb-3">
              <Title text1={'MY'} text2={'CART'} />
          </div>
          <div>
            {

              cartData.map((item, index) =>{
                const productData = products.find((product)=> product._id === item._id);
                if (!productData) {
                  return (
                    <div key={index} className="text-red-500">
                      Product not found
                    </div>
                  );
                }
                return token ?(
                  <div key = {index} 
                    className="
                      py-4 border-t border-b text-gray-700
                      grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr]
                      items-center gap-4
                    
                    ">
                      <div className="flex items-start gap-6">
                          <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
                          <div>
                            <p className="text-xs sm:text-lg font-medium">
                              {productData.title}
                            </p>
                            <div className="flex items-center gap-5 mt-2">
                              <p>
                                {currency} {productData.price}
                              </p>
                              <p className="px-2 sm:py-1 border bg-slate-50">
                                {item.size}
                              </p>
                            </div>
                          </div>
                      </div>
                      <input 
                      onChange = {(e)=>e.target.value === '' || e.target.value === '0'? null : updateCartQuantity(item._id,item.size,Number(e.target.value))}
                        className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                        type="number" 
                        min= {1} 
                        defaultValue={item.quantity}
                      />
                      <img onClick={()=> updateCartQuantity(item._id,item.size,0)} className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="" />
                  </div>
                ):(
                  <NotFound />
                );
              })
            }
          </div>
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <TotalCart />
              <div className="w-full text-end">
                <button onClick={()=> navigate('/placeorder')} className=" rounded bg-black text-white text-sm my-8 px-3 py-3 ">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>

          </div>
        
        
        </>
      }

    </div>

  )
}

export default Cart
