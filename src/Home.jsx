import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Programs from "./components/Programs";
import News from "./components/News";
import About from "./components/About";
import Footer from "./components/Footer";
import HomeLayout from "./layouts/HomeLayout";
import Products from "./components/Products";

const Home = () => {
  return (
    <HomeLayout>
      <Hero />
      <Programs />
      <News />
      <About />
      {/* <Products /> */}
    </HomeLayout>
  );
};

export default Home;
