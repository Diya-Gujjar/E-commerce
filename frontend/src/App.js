import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Seller from "./components/Seller/Seller";
import RegisterSeller from "./components/RegisterSeller/RegisterSeller";
import Terms from "./components/TermsAndPolicies/Terms";
import Policies from "./components/TermsAndPolicies/Policies";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import ProductDescription from "./components/Product/ProductDescription";
import AddToCart from "./components/AddToCart/AddToCart";
import Orders from "./components/Orders/Orders";
import UserProfile from "./components/UserProfile/UserProfile";
import AddProduct from "./components/AddProduct/AddProduct";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/login"
            element={<Login isLogged={isLogged} setIsLogged={setIsLogged} />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/seller" element={<Seller />}></Route>
          <Route path="/registerSeller" element={<RegisterSeller />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/policies" element={<Policies />}></Route>
          <Route path="/addToCart/:id" element={<AddToCart />}></Route>
          <Route path="/addToCart" element={<AddToCart />}></Route>
          <Route path="/cart" element={<Cart isLogged={isLogged} />}></Route>
          <Route
            path="/productDescription/:_id"
            element={<ProductDescription />}
          ></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/user" element={<UserProfile />}></Route>
          <Route path="/addProduct" element={<AddProduct />}></Route>
          <Route
            path="/updateProduct/:productId"
            element={<UpdateProduct />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
