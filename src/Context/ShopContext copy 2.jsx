import { createContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartProducts, setCartProducts] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [currentState, setCurrentState] = useState("LOGIN");

  const navigate = useNavigate();

  // Fetch cart products from the server
  const getCart = async (userToken) => {
    if (!userToken) return;

    try {
      const response = await axios.get(`${backend_url}carts/get`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (response.data.success) {
        setCartProducts(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to fetch cart data.");
    }
  };

  // Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select Product Size");
      return;
    }

    const updatedCart = { ...cartProducts };

    // Update local cart state
    updatedCart[itemId] = updatedCart[itemId] || {};
    updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;

    setCartProducts(updatedCart);

    // Update server cart
    if (token) {
      try {
        const response = await axios.post(
          `${backend_url}carts/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // Calculate total cart count
  const cartCount = useMemo(() => {
    return Object.values(cartProducts).reduce(
      (count, sizes) =>
        count +
        Object.values(sizes).reduce((sizeTotal, quantity) => sizeTotal + quantity, 0),
      0
    );
  }, [cartProducts]);

  // Update cart item quantity
  const updateCartQuantity = async (itemId, size, quantity) => {
    const updatedCart = { ...cartProducts };
    updatedCart[itemId][size] = quantity;

    setCartProducts(updatedCart);

    if (token) {
      try {
        const response = await axios.put(
          `${backend_url}carts/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  // Calculate total cart amount
  const totalCartAmount = useMemo(() => {
    return Object.entries(cartProducts).reduce((total, [itemId, sizes]) => {
      const product = products.find((prod) => prod._id === itemId);
      if (!product) return total;

      return (
        total +
        Object.entries(sizes).reduce(
          (itemTotal, [size, quantity]) => itemTotal + product.price * quantity,
          0
        )
      );
    }, 0);
  }, [cartProducts, products]);

  // Fetch product list
  const getProducts = async () => {
    try {
      const response = await axios.get(`${backend_url}products/`);
      if (response.data.success) {
        setProducts(response.data.data.productList);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    }
  };

  // Fetch token from local storage and initialize cart
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getCart(savedToken);
    }
  }, []);

  // Memoized context value
  const value = useMemo(
    () => ({
      products,
      currency,
      delivery_fee,
      search,
      setSearch,
      showSearch,
      setShowSearch,
      addToCart,
      cartProducts,
      cartCount,
      updateCartQuantity,
      totalCartAmount,
      navigate,
      backend_url,
      token,
      setToken,
      currentState,
      setCurrentState,
    }),
    [
      products,
      currency,
      delivery_fee,
      search,
      showSearch,
      cartProducts,
      cartCount,
      updateCartQuantity,
      totalCartAmount,
      navigate,
      backend_url,
      token,
      currentState,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
