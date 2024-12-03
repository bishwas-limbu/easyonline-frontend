import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartProducts, setCartProducts] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [token,setToken]=useState("");
    const [currentState, setCurrentState] = useState('LOGIN');
    const [email_, setEmail_] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [test,setTest] = useState("");

    const getCart = async (token) => {
        if(token){
            try{
                const response = await axios.get(backend_url+'carts/get', {headers: { Authorization: `Bearer ${token}` }});
                if(response.data.success){
                   // console.log(response.data.data);
                    setCartProducts(response.data.data);
                    toast.success(response.data.message);
                }
                
            } catch(error){
                console.error(error.message);
            }
        }
    }
    const addToCart = async (itemId, size) => {
        console.log("size :",size)
        console.log("itemId : ",itemId)

        if (size.length === 0) {
            toast.error('Please Select Product Size');
            return;
        }
        const cartCopy = structuredClone(cartProducts);

            
            if (cartCopy[itemId]) {
                if (cartCopy[itemId][size]) {
                    cartCopy[itemId][size] += 1;
                } else {
                    cartCopy[itemId][size] = 1;
                }
            } else {
                cartCopy[itemId] = {};
                cartCopy[itemId][size] = 1;

            }

        setCartProducts(cartCopy);
        if(token){
            try{
                const response = await axios.post(backend_url+'carts/add', {itemId,size},{headers: { Authorization: `Bearer ${token}` }});
                if(response.data.success){
                   // console.log(response.data.data);
                  //  setCartProducts(response.data.data);
                    toast.success(response.data.message);
                }
            } catch(error){
                console.error(error);
            }
        }
    };

    // const cartCount = () => {
    //     let countTotal = 0;
    //     for (const items in cartProducts) {
    //         for (const item in cartProducts[items]) {
    //             try {
    //                 if (cartProducts[items][item] > 0) {
    //                     countTotal += cartProducts[items][item];
    //                 }
    //             } catch (error) {
    //                 console.error(error.message);
    //             }
    //         }
    //     }
    //     return countTotal;
    // };
    const cartCount = () => {
        return Object.values(cartProducts).reduce((total, sizes) => {
            return total + Object.values(sizes).reduce((sizeTotal, quantity) => {
                return sizeTotal + (quantity > 0 ? quantity : 0);
            }, 0);
        }, 0);
    };
    useEffect(() => {
        
        if(!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getCart(localStorage.getItem('token'))
        }
    }, []);
    useEffect(() => {
        if (token) {
            getCart(token); // Fetch cart whenever the token changes (e.g., after login)
        }
    }, [token]);

    const updateCartQuantity = async(itemId, size, quantity) => {
 
           let cartCopy = structuredClone(cartProducts);
            
           cartCopy[itemId][size] = quantity;

           setCartProducts(cartCopy);
           if(token){
               try{
                  const response =  await axios.put(backend_url+'carts/update', {itemId,size,quantity},{headers: { Authorization: `Bearer ${token}` }});
                   if(response.data.success){
                    // console.log(response.data.data);
                   //  setCartProducts(response.data.data);
                     toast.success(response.data.message);
                 }
               } catch(error){
                   console.error(error);
               }
           }

        
    }

    const totalCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartProducts) {
            const itemInfo = products.find(product => product._id === items);
            if (itemInfo) {
                for (const item in cartProducts[items]) {
                    try {
                        if (cartProducts[items][item] > 0) {
                            totalAmount += itemInfo.price * cartProducts[items][item];
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        }
        return totalAmount;
    };

    const getProducts = async () => {
        try{
                const response = await axios(backend_url+'products/');
                
         //     console.log(response.data.productList)
              if(response.data.success){
                setProducts(response.data.data.productList);
              }
                
        }catch(error){
            if (axios.isAxiosError(error)) {
                // Check if the error response exists
                if (error.response) {
                  // Log the status code and response data
                  console.error('Error status:', error.response.status);
                  console.log('Error data:', error.response.data.message);
                  toast.error(error.response.data.message);
                } 
              } else {
                console.error('An unexpected error occurred:', error);
              }
        }
    }

    useEffect(() => {
        getProducts();
    },[]);

    const value = useMemo(() => ({
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
        setCartProducts,
        backend_url,token,setToken,currentState, setCurrentState,email_, setEmail_,resetToken, setResetToken,test,setTest
    }), [token,products, currency, delivery_fee, search, showSearch, cartProducts, backend_url,test,currentState,email_,resetToken]);

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
