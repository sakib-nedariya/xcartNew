import React from "react";
import HeroContainer from "./HeroContainer";
import BrandCollection from "./BrandCollection";
import ProductCategory from "./ProductCategory";
import Contact from "./Contact";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Category from "./Category";
import Highlights from "./Highlights";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroContainer />
      <Category />
      <ProductCategory />
      <BrandCollection />
      <Highlights />  
      <Contact />
      <Footer />
    </>
  );
};

export default index;
