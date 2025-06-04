import { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { PiShoppingCart, PiStorefront } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import HamBurger from "../Hamburger/HamBurger";
import useStore from "../ZustandStore/Store";
import "./Header.css";
import logo from "../../assets/logo.png";

const searchClient = algoliasearch(
  "L591ZZIR9E",
  "ef312e22c5158070f110501bcc9355a9"
);
const index = searchClient.initIndex("products");

function Header() {
  const storedData = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isHovered, setIsHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [burgerState, setBurgerState] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const cartItems = useStore((state) => state.cart);

  const handleBurgerClick = () => {
    setBurgerState((prevState) => !prevState);
  };

  const submitLogin = () => {
    return navigate("/login");
  };

  const logout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("authToken");
    return navigate("/");
  };

  useEffect(() => {
    if (search.trim() !== "") {
      index
        .search(search)
        .then(({ hits }) => {
          setSearchResults(hits);
        })
        .catch(console.error);
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <button className="brgr" onClick={handleBurgerClick}>
            <CiMenuBurger className="horiz-split" />
          </button>
          <div>{burgerState && <HamBurger />}</div>
          {/* <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus_mobile-39120d.svg"
            alt="logo"
          /> */}
          <img src={logo} alt="Logo"></img>
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
          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((item) => (
                <div key={item.objectID} className="search-item">
                  <div
                    className="srch-item-image"
                    onClick={() =>
                      navigate(`/productDescription/${item.objectID}`)
                    }
                  >
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div
                    className="srch-item-dtl"
                    onClick={() =>
                      navigate(`/productDescription/${item.objectID}`)
                    }
                  >
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">₹{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <ul className="header-list">
          <li
            className="lnk login"
            onMouseEnter={() => {
              if (hoverTimeout) clearTimeout(hoverTimeout);
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              const timeout = setTimeout(() => {
                setIsHovered(false);
              }, 1000);
              setHoverTimeout(timeout);
            }}
          >
            {storedData ? (
              <button className="login-btn" onClick={logout}>
                Logout
              </button>
            ) : (
              <button className="login-btn" onClick={submitLogin}>
                <IoPersonOutline className="icon" />
                Login
                {isHovered ? (
                  <RiArrowDropDownLine
                    style={{ transform: "rotate(180deg)" }}
                    className="arrow-down"
                  />
                ) : (
                  <RiArrowDropDownLine className="arrow-down" />
                )}
              </button>
            )}

            {isHovered && (
              <ul
                className="login-dropdown"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <li>
                  <a href="/register">
                    New customer? <b>Sign Up</b>
                  </a>
                </li>
                <li>
                  <a href="/user">My Profile</a>
                </li>
                <li>
                  <a href="/orders">Orders</a>
                </li>
                <li>
                  <a href="/registerSeller">Register as Seller</a>
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
