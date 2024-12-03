import { useContext, useEffect, useState } from "react"
import {ShopContext} from "../Context/ShopContext"
import { assets } from "../assets/frontend_assets/assets";
import Title from "../Components/title"; 
import ProductsItem from "../Components/ProductsItem";

const Collection = () => {
  const {products,showSearch, search} = useContext(ShopContext);

 const [displayFilter,setDisplayFilter] = useState(false);
 const [filterProducts,setFilterProducts] = useState([]);
 const [category,setCategory]=useState([]);
 const [subCategory,setSubCategory]=useState([]);
 const [type, setType]=useState('relevant');

 /* storing the products in the state */
 useEffect(()=>{
  if(products){
    setFilterProducts(products);
  }
 },[products]);


/* storing subcategory in state */
const toggleSubCategory = (e) => {
  if(subCategory.includes(e.target.value)){
    setSubCategory(prev=> prev.filter(item => item !== e.target.value))
  }else{
    setSubCategory(prev => [...prev,e.target.value]);
  }
}

/* storing category in state */
const toggleCategory = (e) => {
  if(category.includes(e.target.value)){
    setCategory(prev=> prev.filter(item => item !== e.target.value))
  }else{
    setCategory(prev => [...prev,e.target.value]);
  }
}

/* Product filter based on category and sub category */
const productFilter = () => {
  let filterItems = products.slice();
  if(showSearch && search){
    filterItems = filterItems.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
  }

  if (category.length > 0){
    filterItems = filterItems.filter(item => category.includes(item.category));
  }
  console.log("category", filterItems)
  if (subCategory.length > 0){
    filterItems = filterItems.filter(item => subCategory.includes(item.subCategory));
  }
  console.log("subCategory", filterItems)
  setFilterProducts(filterItems);
}


useEffect(()=>{
  productFilter();
},[category,subCategory,search,showSearch,products]);
  //console.log(products);

/* Sorting products based on price */

const productSorting = () => {
  let filterProductCopy = filterProducts.slice(); 
  switch (type){
    case 'low-high':
      setFilterProducts(filterProductCopy.sort((a,b) => a.price - b.price));
      break;
    case 'high-low':
      setFilterProducts(filterProductCopy.sort((a,b) => b.price - a.price));
      break;
    default:
      productFilter();
      break;

  }

}
useEffect(() => {
  productSorting();
},[type]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* Filter options  Left side*/}
        <div className="min-w-60">
          <p onClick= {()=>setDisplayFilter(!displayFilter)} className="my-2 tex-xl flex items-center cursor-pointer gap-2">
            FILTERS
             <img className= {`h-3 sm:hidden ${displayFilter? 'rotate-90': ''}`} src={assets.dropdown_icon} alt="" />
          </p>

          {/* Category filter */}
          <div className={
            `border border-gray-300 pl-5 py-3 mt-6
            ${displayFilter ? '' :'hidden'} sm:block`
          }>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input 
                  className="w-3" 
                  type="checkbox" 
                  value = {"Men"}
                  onChange = {toggleCategory}
                /> Men
              </p>
              <p className="flex gap-2">
                <input 
                  className="w-3" 
                  type="checkbox" 
                  value = {"Women"}
                  onChange = {toggleCategory}
                /> women
              </p>
              <p className="flex gap-2">
                <input 
                  className="w-3" 
                  type="checkbox" 
                  value = {"Kids"}
                  onChange = {toggleCategory}
                /> Kids
              </p>

            </div>
            
          </div>
          {/* Sub Category Filter */}
          <div className={
            `border border-gray-300 pl-5 py-3 my-5
            ${displayFilter?'' :'hidden'} sm:block`
          }>
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input 
                  className="w-3" 
                  type="checkbox" 
                  value = {"Winterwear"}
                  onChange={toggleSubCategory}
                /> Winter wear
              </p>
              <p className="flex gap-2">
                <input 
                  className="w-3" 
                  type="checkbox" 
                  value = {"Bottomwear"}
                  onChange={toggleSubCategory}
                /> Bottom wear
              </p>
              <p className="flex gap-2">
                <input 
                  className="w-3" 
                  type="checkbox" 
                  value = {"Topwear"}
                  onChange={toggleSubCategory}
                /> Top wear
              </p>

            </div>
            
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={'ALL'} text2={'COLLECTION'}/>
            {/* Sorting Product */}
            <select onChange = {(e)=> setType(e.target.value)} className="border-2 border-gray-300 text-sm px-2" name="" id="">
              <option value="relevant">Sort by relevant</option>
              <option value="low-high">Sort by Low to High</option>
              <option value="high-low">Sort by High to Low</option>
            </select>
          </div>
          {/* display all products */}
          <div className="
            grid grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 gap-4 gap-y-6
          ">
            {
              filterProducts.map((item,index) => (
                <ProductsItem 
                key={index}
                id = {item._id}
                title = {item.title}
                price = {item.price}
                image = {item.image}
                />
              ))
            }
          </div>
        </div>

    </div>
  )
}

export default Collection
