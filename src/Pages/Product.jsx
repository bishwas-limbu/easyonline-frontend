import { useContext,useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import SimilarProduct from "../Components/SimilarProduct";


function Product() {
  const {productId} = useParams();
  const {products,currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image,setImage] = useState("");
  const [error, setError] = useState(null);
  const [selectedSize,setSelectedSize] = useState([]);



  console.log(productId);

  console.log(productData);

  const fetchProductData = async() =>{

      
        const item = products.find((item) => item._id === productId);
        if (item) {
          setProductData(item);
          setImage(item.image[0]);
          setError(null);
        } 
     

  }

 
  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    } 
  }, [productId, products]);
  
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 text-opacity-100">
      {/* productData--------------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images ------------------ */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item,index)=>(
                <img 
                  onClick = {()=>setImage(item)}
                  key={index}
                  src={item} 

                  alt="product image" 
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))
            }
          </div> */}

          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">

                <img 
                  src={productData.image[0]} 

                  alt="product image" 
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />

          </div>
           <div className="w-full sm:w-[80%]">
             <img className="w-full h-auto" src={image} alt="" />

           </div>
        </div>
        {/* Product Info-------------------  */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.title}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>

          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className = "mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item,index)=>( <button onClick={() => setSelectedSize(item)} key={index} className={`rounded border py-2 px-5 bg-gray-100 ${item===selectedSize?'border-orange-500':''}`}> {item} </button> )) 
               
              }
            </div>
          </div>
          <button onClick ={()=>addToCart(productData._id,selectedSize)} className="bg-black text-white px-8 py-3 text-sm active:bg-green-700">Add To Cart</button>
          <hr className="mt-8 sm:w-4/5 "/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original Product</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* description and review section */}
      <div className="mt-20">
            <div className="flex">
              <b className="border px-5 py-3 text-sm cursor-pointer">Description</b>
              <p className="border px-5 py-3 text-sm cursor-pointer">Reviews(122)</p>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio quos quidem eligendi exercitationem facilis, consequatur cum, aspernatur laborum possimus et amet velit culpa adipisci quaerat totam reprehenderit veritatis sit excepturi!

              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio quos quidem eligendi
              </p>
            </div>
      </div>
      {/* display related products */}
      <SimilarProduct category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ):   <div className="text-red-500 text-center mt-10">
          {error || "Loading product..."}
       </div>
}

export default Product
