import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Orders from "./Pages/Orders/Orders";
import Result from "./Pages/Result/Result";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

function Router() {
  const stripePromise = loadStripe(
    "pk_test_51RU0meRjTiMvPkt25tlsTZblPmscz1NKOuiFaPk5dVX9gNViHYlM6HvtebLKXkdwk8JkGlEP6TsyhzckPgJ7ITGw00G11Fakha"
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoutes
              msg={"you must login first to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoutes>
          }
        />
        <Route path="/productdetial" element={<ProductDetail />} />
        <Route path="/category/:category" element={<Result />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes
              msg={"you must login first to see your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
