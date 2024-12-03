import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import NotFound from "./NotFound"

const StripeVerify = () => {
  const{backend_url,navigate, token, setCartProducts} = useContext(ShopContext);

  const [searchParams,setSearchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

 
  const paymentVerification = async() => {
    console.log("verify success:",success);
    console.log("verify order id:",orderId);

    try{

        if(!token){
            return null;
        }

        const response = await axios.post(backend_url + 'orders/stripeVerify',
        {success, orderId},
        {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        console.log("1")
        console.log("verify", response.data)
        if(response.data.success){
            setCartProducts({});
            navigate('/orders');
        }else{
            navigate('/carts');
        }
    }catch(error){
        console.log(error.message)
        toast.error(error.message);
    }
  } 

  useEffect(() =>{
    paymentVerification();
  },[token])

  return token ?(
    <div>
      
    </div>
  ):(
    <NotFound />
  );
}

export default StripeVerify
