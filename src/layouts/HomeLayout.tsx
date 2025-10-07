import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomeLayout = ({ children }: any) => {
  return (
    <div className="Home">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
