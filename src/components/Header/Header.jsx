import React, { useState } from "react";
import "./Header.css";
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCart } from "react-icons/pi";
import { PiStorefront } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbSquareArrowDown } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import HamBurger from "../Hamburger/HamBurger";
import useStore from "../ZustandStore/Store";

function Header() {
  const navigate = useNavigate();
  const submitLogin = () => {
    return navigate("/login");
  };
  const [search, setSearch] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [burgerState, setBurgerState] = useState(false);

  const cartItems = useStore((state) => state.cart);

  const handleBurgerClick = () => {
    setBurgerState((prevState) => !prevState);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <button className="brgr" onClick={handleBurgerClick}>
            <CiMenuBurger className="horiz-split" />
          </button>
          <div>{burgerState && <HamBurger />}</div>
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus_mobile-39120d.svg"
            alt="logo"
          />
        </div>
        <div className="header-search">
          <CiSearch className="search-icon" />
          <input
            type="text"
            title="Search for Products, Brands and More"
            placeholder="Search for Products, Brands and More"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="header-list">
          <a>
            <TbSquareArrowDown className="horiz-split" />
          </a>
          <li
            className="lnk login"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button className="login-btn" onClick={submitLogin}>
              <IoPersonOutline className="icon" /> Login{" "}
              {isHovered ? (
                <RiArrowDropDownLine
                  style={{ transform: "rotate(180deg)" }}
                  className="arrow-down"
                />
              ) : (
                <RiArrowDropDownLine className="arrow-down" />
              )}
            </button>
            {isHovered && (
              <ul className="login-dropdown">
                <li>
                  <a href="/register">
                    New customer? <b>Sign Up</b>
                  </a>
                </li>
                <li>
                  <a href="/account">My Profile</a>
                </li>
                <li>
                  <a href="/plus">Flipkart Plus Zone</a>
                </li>
                <li>
                  <a href="/orders">Orders</a>
                </li>
                <li>
                  <a href="/wishlist">Wishlist</a>
                </li>
                <li>
                  <a href="/rewards">Rewards</a>
                </li>
                <li>
                  <a href="/giftcards">Gift Cards</a>
                </li>
              </ul>
            )}
          </li>
          <li className="lnk" id="header-cart">
            <a href="/cart" className="icon-content">
              <PiShoppingCart className="icon inc-size" id="cart-icon" />
              {cartItems.length > 0 && (
                <div className="cart-count">{cartItems.length}</div>
              )}
              <div className="small-disapper"> Cart </div>
            </a>
          </li>
          <li className="lnk" id="header-seller">
            <a href="/seller" className="icon-content">
              <PiStorefront className="icon inc-size" />
              <div className="small-disapper"> Become a Seller </div>
            </a>
          </li>
        </ul>
        <div>
          <li
            className="lnk menu-icon"
            onMouseEnter={() => setMenuHovered(true)}
            onMouseLeave={() => setMenuHovered(false)}
          >
            <BsThreeDotsVertical className="icon" />
            {menuHovered && (
              <ul className="menu-dropdown">
                <li>
                  <a href="/notifications">Notifications</a>
                </li>
                <li>
                  <a href="/customer-care">24 x 7 Customer Care</a>
                </li>
                <li>
                  <a href="/advertise">Advertise</a>
                </li>
              </ul>
            )}
          </li>
        </div>
      </nav>
    </header>
  );
}

export default Header;
