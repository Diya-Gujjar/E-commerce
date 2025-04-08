import React, { useState } from "react";
import "./Register-login-header.css";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineHorizontalSplit } from "react-icons/md";
import { TbSquareArrowDown } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function RegisterLoginHeader() {
  const navigate = useNavigate();
  const submitLogin = () => {
    return navigate("/login");
  };
  const [search, setSearch] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);

  return (
    <header className="register-header">
      <nav className="rgstr-nav">
        <div className="logo">
          <div className="logo2">
            <a href="/" className="logo-flpkrt">
              {/* <img
                className="logo-flpkrt"
                width="60"
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                alt="Flipkart"
              /> */}{" "}
              Flipkart
            </a>
            <a href="/plus" className="logo-plus">
              Explore{" "}
              <span style={{ color: "#dbf642", paddingRight: "2px" }}>
                Plus
              </span>
              <img
                className="logo-img"
                width="10"
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
              />
            </a>
          </div>

          <MdOutlineHorizontalSplit className="horiz-split" />
        </div>
        <div className="rgstr-header-search">
          <input
            type="text"
            title="Search for Products, Brands and More"
            placeholder="Search for Products, Brands and More"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch className="rgstr-search-icon" />
        </div>
        <ul className="rgstr-header-list">
          <a>
            <TbSquareArrowDown className="horiz-split" />
          </a>
          <li
            className="rgstr-lnk rgstr-login"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button className="rgstr-login-btn" onClick={submitLogin}>
              Login
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
          <li className="rgstr-lnk" id="header-seller">
            <a href="/seller" className="icon-content">
              <div className="small-disapper"> Become a Seller </div>
            </a>
          </li>
          <li
            className="rgstr-lnk menu-icon"
            id="header-more"
            onMouseEnter={() => setMenuHovered(true)}
            onMouseLeave={() => setMenuHovered(false)}
          >
            More
            {menuHovered ? (
              <RiArrowDropDownLine
                style={{ transform: "rotate(180deg)" }}
                className="arrow-down"
              />
            ) : (
              <RiArrowDropDownLine className="arrow-down" />
            )}
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
          <li className="rgstr-lnk" id="header-cart">
            <a href="/cart" className="icon-content">
              <FaShoppingCart className="rgstr-icon inc-size" />
              <div className="small-disapper"> Cart </div>
            </a>
          </li>
        </ul>
        <div></div>
      </nav>
    </header>
  );
}

export default RegisterLoginHeader;
