import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
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
import { useEffect, useState } from "react";

const App = () => {


  const [prods,setProds] = useState([]);
  useEffect(async() => {
    var mounted = true;
    await products((data)=>{
      console.log(data);
      data?.products? setProds(data?.products) : setProds([]);
    })
  
    return () => {
      mounted=false;
    }
  }, [])
  
  return <Home/>;
  // return <Product/>;
  // return <ProductList  products={prods} />;
 // return <Register/>;
  //return <Login/>;
  //return <Cart/>;
  // return <Categories/>;
  // return <CategoryItem/>; //error
  // return <Navbar/>;
  // return <Newsletter/>;
  // return <Slider/>;
  // return <MiniSlider/>;
  // return <Footer/>;
  // return <HouseProducts/>;
  // return <MensCloths/>;
  // return <WomenCloths/>;
};

export default App;