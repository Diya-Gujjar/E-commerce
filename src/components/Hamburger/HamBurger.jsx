import React, { useState, useEffect } from "react";
import "./HamBurger.css";
import classNames from "classnames";
import { FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiMiniArrowUpOnSquare } from "react-icons/hi2";
import { BiSolidDiscount } from "react-icons/bi";
import { BsBagFill } from "react-icons/bs";

function HamBurger() {
  const [isOpen, setIsOpen] = useState(true);

  const handleOutsideClick = (e) => {
    if (
      isOpen &&
      !e.target.closest(".hamburger-container") &&
      !e.target.closest(".brgr")
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const divClass = classNames({
    "hamburger-container": true,
    open: isOpen,
  });

  return (
    <div className={divClass}>
      {/* <div className={`hamburger-container  ${isOpen ? "open" : ""} `}> */}
      <div className="hamburger-header">
        <div className="header-auth">
          <IoPerson />
          <a href="/login">
            <span>Login & Signup</span>
          </a>
        </div>
        <div className="hamburger-header-logo">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logo_lite-cbb357.png"
            alt="logo"
          />
        </div>
      </div>

      <div className="hamburger-menu">
        <ul>
          <li>
            <a href="/allCategories" className="hamburger-menu-item">
              <HiMiniSquares2X2 style={{ fontSize: "18px" }} />
              <span>All Categories</span>
            </a>
          </li>
          <li>
            <a href="/offers" className="hamburger-menu-item">
              <BiSolidDiscount style={{ fontSize: "20px" }} />
              <span>Offer Zone</span>
            </a>
          </li>
          <li>
            <a href="/seller" className="hamburger-menu-item">
              <BsBagFill style={{ fontSize: "18px" }} />
              <span>Sell on Flipkart</span>
            </a>
          </li>
          <li>
            <a href="/orders" className="hamburger-menu-item">
              <HiMiniArrowUpOnSquare style={{ fontSize: "20px" }} />
              <span>My Orders</span>
            </a>
          </li>
          <li>
            <a href="/cart" className="hamburger-menu-item">
              <FaShoppingCart style={{ fontSize: "20px" }} />
              <span>My Cart</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HamBurger;
