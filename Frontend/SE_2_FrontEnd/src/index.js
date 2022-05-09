import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import App from './App';
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
ReactDOM.render(
 
    
    <BrowserRouter>
    <Routes>
             <Route path="/" element={<App />} />
      
          <Route path="/Product" element={<Product />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
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
      
    </Routes>
  </BrowserRouter>
  ,
  document.getElementById('root')
);