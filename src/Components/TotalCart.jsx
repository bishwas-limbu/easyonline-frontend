import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './title';

const TotalCart = () => {
  const{currency, delivery_fee,totalCartAmount} = useContext(ShopContext);
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'Total'} text2={'Amount'}/>
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency}{totalCartAmount()}.00</p>

            </div>
            <div className="flex justify-between">
                <p>Shipping fee</p>
                <p>{currency}{delivery_fee}.00</p>
                
            </div>
            <hr />
            <div className="flex justify-between">
                <b>Total</b>
                <b>{currency}{totalCartAmount() === 0 ? 0:totalCartAmount() + delivery_fee}.00</b>
            </div>
        </div>
    </div>

  )
}

export default TotalCart
