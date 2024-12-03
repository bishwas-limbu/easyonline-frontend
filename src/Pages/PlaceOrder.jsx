import { useContext, useState } from "react"
import { assets } from "../assets/frontend_assets/assets"
import Title from "../Components/title.jsx" 
import TotalCart from "../Components/TotalCart"
import { ShopContext } from "../Context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"
import NotFound from "./NotFound"


function PlaceOrder() {

  const [selectPayment,setSelectPayment] = useState('cod')
  const{ setCartProducts,products,delivery_fee,navigate, backend_url, token,cartProducts,totalCartAmount} = useContext(ShopContext);

  const [formData, setFromData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',  
    phone:'',
  });

  const onChangeHandler = (e) => {
  
    setFromData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    let orderItems = [];
   // console.log(cartProducts)

    for(const items in cartProducts){
      // console.log(items)
       console.log("products",products[0]._id)
      for(const item in cartProducts[items]){
        if(cartProducts[items][item] > 0){
          console.log(items)
          const itemData = structuredClone(products.find(
            product => product._id === items
          ));
          console.log("itemdata",itemData)
          if(itemData){
            itemData.size = item
            itemData.quantity = cartProducts[items][item]
            orderItems.push(itemData);
         }
          console.log("first")
        }
        console.log(cartProducts[items][item])
      }
    }
    console.log("orderItems",orderItems)
    let orderData = {
      address:formData,
      items:orderItems,
      amount: totalCartAmount() + delivery_fee 
    }
    switch(selectPayment){
      case 'cod':
        console.log("first__")
        const response = await axios.post(backend_url+'orders/placeorder',orderData,{headers: { Authorization: `Bearer ${token}` }});

        console.log("response",response.data)
        if(response.data.success){
          setCartProducts({});
          navigate('/orders');
          toast.success(response.data.message);
          
        }else{
          toast.error(response.data.message)
        }
        break;
      
      case 'stripe':
        const responseStripe = await axios.post(backend_url+'orders/stripe',orderData,{headers: { Authorization: `Bearer ${token}` }});
        if(responseStripe.data.success){
          console.log("place order",responseStripe.data)
          const{session_url} = responseStripe.data;
          console.log("session",session_url)
          window.location.replace(session_url);
        }else {
          toast.error(responseStripe.data.message)
        }
        break;

      default:
        break;
    }

  }
  return token ? (
    <form 
      onSubmit={onSubmitHandler}
      className="
        flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 
        min-h-[80vh] border-t
    ">
      {/* left side section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
            <Title text1={'SHIPPING'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input 
            onChange={onChangeHandler}
            name = 'firstName'
            value = {formData.firstName}
            className="focus:outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" 
            placeholder="First Name"
            required
          />
          <input 
            onChange={onChangeHandler}
            name = 'lastName'
            value = {formData.lastName}            
            className="focus:outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" 
            placeholder="Last Name"
            required
          />

        </div>
        <input 
            onChange={onChangeHandler}
            name = 'email'
            value = {formData.email}
            className="focus:outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email" 
            placeholder="Email address"
            required
          />
        <input
            onChange={onChangeHandler}
            name = 'street'
            value = {formData.street} 
            className="focus:outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" 
            placeholder="Street name"
            required
          />
        <div className="flex gap-3">
            <input 
              onChange={onChangeHandler}
              name = 'city'
              value = {formData.city}
              className="focus:outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text" 
              placeholder="City"
              required
            />
            <input 
              onChange={onChangeHandler}
              name = 'state'
              value = {formData.state}
              className="focus:outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text" 
              placeholder="State"
              required
            />

        </div>
        <div className="flex gap-3">
        <input 
            onChange={onChangeHandler}
            name = 'zipcode'
            value = {formData.zipcode}
            className="focus:outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number" 
            placeholder="zip code"
            required
        />
          <input 
            onChange={onChangeHandler}
            name = 'country'
            value = {formData.country}
            className="focus:outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" 
            placeholder="Country"
            required
          />

        </div>
        <input 
            onChange={onChangeHandler}
            name = 'phone'
            value = {formData.phone}
            className="focus:outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number" 
            placeholder="Phone number"
            required
        />

      </div>
      {/* Right Section */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <TotalCart/>
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2="METHOD"/>

          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick = {()=>setSelectPayment('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded">
                <p className={`min-w-3.5 h-3.5 border rounded-full
                  ${selectPayment === 'stripe' ? 'bg-blue-400' : ''}
                  `}></p>
                <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
              </div>

              <div onClick = {()=>setSelectPayment('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded">
                <p className={`min-w-3.5 h-3.5 border rounded-full
                  ${selectPayment === 'cod' ? 'bg-blue-400' : ''}
                  `}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
          </div>
          <div className="w-full text-end mt-8">
              <button type = "submit"  className="bg-black text-white px-16 py-3 text-sm rounded">PLACE ORDER</button>
              {/* onClick = {()=>navigate('/orders')} */}
          </div>
        </div>
      </div>

    </form>
  ): (
    <NotFound />
  );
}

export default PlaceOrder
