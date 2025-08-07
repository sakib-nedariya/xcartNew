import React from "react";
import HeroContainer from "./HeroContainer";
import BrandCollection from "./BrandCollection";
import ProductCategory from "./ProductCategory";
import Contact from "./Contact";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Category from "./Category";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroContainer />
      <Category />
      <ProductCategory />
      <BrandCollection />
      <Contact />
      <Footer />
    </>
  );
};

export default index;
