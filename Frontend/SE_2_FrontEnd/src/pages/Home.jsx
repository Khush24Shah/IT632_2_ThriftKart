import React from "react";
import Announcement from "../components/Announcement";
import Announcement1 from "../components/Announcement1";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import MiniSlider from "../components/MiniSlider";


const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Announcement />
      <Products />
      <Announcement1 />
      <Categories />
      <MiniSlider />
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
