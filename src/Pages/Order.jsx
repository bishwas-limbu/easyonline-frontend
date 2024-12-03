import { useContext,useEffect,useState } from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from "../Components/title.jsx" 
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import NotFound from "./NotFound"


function Order() {
  const {backend_url,token,products,currency} = useContext(ShopContext);

  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state



  const getUserOrders = async ()=>{
    setLoading(true);
    try{
      if(!token){
        return null;
      }

     const response = await axios.get(backend_url + 'orders/user', {headers: { Authorization: `Bearer ${token}` }});
     // console.log("orders",response.data)
      if(response.data.success){
        let allOrdersItem = [];
        // response.data.data.map((order) =>{
        //   console.log("orders",order);
        //   order.items.map((item) =>{
        //     item['status'] = order.status;
        //     item['isPayment'] = order.isPayment;
        //     item['paymentMethod'] = order.paymentMethod;
        //     item['date'] = order.date;
        //     allOrdersItem.push(item);

           
        //   })
        // })
        response.data.data.forEach((order) => {
     //     console.log("orders", order);
          const { status, isPayment, paymentMethod, date, items } = order;
          
          items.forEach((item) => {
            const newItem = {
              ...item,
              status,
              isPayment,
              paymentMethod,
              date,
            };
            allOrdersItem.push(newItem);
          });
        });       
        
        setOrderList(allOrdersItem.reverse())
      //  console.log(orderList);
      }
     
      
    }catch(error){
     console.log(error.message)
    }finally {
      setLoading(false); // End loading
    }
  }
 
  useEffect(() =>{
   // console.log("first")
    getUserOrders();
  //  console.log("List",orderList)
  
  },[token])
 
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  return token ? (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderList.map((product, index) => (
            <div key = {index}
              className="py-4 border-t border-b text-gray-700 flex flex-col
                        md:flex-row md:items-center md:justify-between gap-4
              "
            > 
                <div className="flex items-start gap-6 text-sm">
                    <img className = "w-16 sm:w-20" src={product.image[0]} alt="" />
                    <div>
                      <p className="text-base font-medium">{product.name}</p>
                      <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                          <p className="text-sm">{currency}{product.price}</p>
                          <p className="text-sm">Quantity : {product.quantity}</p>
                          <p className="text-sm">Size : {product.size}</p>
                      </div>
                      <p className="mt-2 text-sm">Date : <span className="text-gray-400"> 
                        {
                          new Date(product.date).toDateString()
                        }
                        </span>
                      </p>
                      <p className="mt-2 text-sm">Payment : <span className="text-gray-400"> 
                        {
                          product.paymentMethod
                        }
                        </span>
                      </p>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                      <p className="text-sm md:text-base">{product.status}</p>
                    </div>
                    <button onClick = {getUserOrders} className="border px-4 py-2 text-sm font-medium rounded">
                      Track Order
                    </button>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  ): (
    <NotFound />
  );
}

export default Order
