import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Seller from "./components/Seller/Seller";
import RegisterAdmin from "./components/RegisterAdmin/RegisterAdmin";
import Terms from "./components/TermsAndPolicies/Terms";
import Policies from "./components/TermsAndPolicies/Policies";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import ProductDescription from "./components/Product/ProductDescription";
import AddToCart from "./components/AddToCart/AddToCart";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/login"
            element={<Login isLogged={isLogged} setIsLogged={setIsLogged} />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/seller" element={<Seller />}></Route>
          <Route path="/registerAdmin" element={<RegisterAdmin />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/policies" element={<Policies />}></Route>
          <Route
            path="/addToCart/:category/:id"
            element={<AddToCart />}
          ></Route>
          <Route path="/cart" element={<Cart isLogged={isLogged} />}></Route>
          <Route
            path="/productDescription/:category/:id"
            element={<ProductDescription />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
