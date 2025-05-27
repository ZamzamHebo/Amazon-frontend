import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";

import Payment from "./Pages/Payment/Payment";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Orders from "./Pages/Orders/Orders";
import SignUp from "./Pages/Auth/SignUp";
import Result from "./Pages/Result/Result";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/productdetial" element={<ProductDetail />} />
        <Route path="/category/:category" element={<Result />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
