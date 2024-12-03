import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const ProductsItem = ({id, title, price, image}) => {
  // Retrieve currency from context
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img src= {image[0]} alt={title} className="hover:scale-110 transition ease-in-out" />
      </div>
      <p className="pt-3 pb-1 text-sm">{title}</p>
      <p className="text-sm font-medium">{currency}{price}</p>
    </Link>

  );
};

export default ProductsItem;