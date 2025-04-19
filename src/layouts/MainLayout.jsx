import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
