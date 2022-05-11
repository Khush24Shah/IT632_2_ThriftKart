import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Categories from "./components/Categories";
import CategoryItem from "./components/CategoryItem";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Slider from "./components/Slider";
import MiniSlider from "./components/MiniSlider";
import Footer from "./components/Footer";
import HouseProducts from "./components/HouseProducts";
import MensCloths from "./components/MensCloths";
import WomenCloths from "./components/WomenCloths";
import { products } from "./data/products";
import ProductAdd from "./pages/ProductAdd";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile"
const App = () => {
const [prods,setProds] = useState([]);
  useEffect(async() => {
    var mounted = true;
   
    mounted && await products((data)=>{
      console.log(data);
      data?.products? setProds(data?.products) : setProds([]);
    })
  
    return () => {
      mounted=false;
    }
  }, [])
  
   return  <BrowserRouter>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Product/:id" element={<Product />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ProductList" element={<ProductList products={prods} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/CategoryItem" element={<CategoryItem />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Newsletter" element={<Newsletter />} />
          <Route path="/Slider" element={<Slider />} />
          <Route path="/MiniSlider" element={<MiniSlider />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/HouseProducts" element={<HouseProducts />} />
          <Route path="/MensCloths" element={<MensCloths />} />
          <Route path="/WomensCloths" element={<WomenCloths />} />
          <Route path="/ProductAdd" element={<ProductAdd />} />
      
    </Routes>
  </BrowserRouter>
  
};

export default App;