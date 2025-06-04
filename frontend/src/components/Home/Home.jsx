import { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./Home.css";
import Carousel from "../Carousel/Carousel";
import ProductCardContainer from "../Product/Product";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Home() {
  const [electronics, setElectronics] = useState([]);
  const [smartphone, setSmartphone] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [women, setWomen] = useState([]);
  const [men, setMen] = useState([]);
  const [kids, setKids] = useState([]);
  const [more, setMore] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(
        window.location.hash.substring(1)
      );
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 50,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/category/Electronics")
      .then((response) => {
        if (response && response.data) {
          setElectronics(response.data);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Electronics:", error);
      });

    axios
      .get("http://localhost:8000/api/products/category/SmartPhone")
      .then((response) => {
        if (response && response.data) {
          setSmartphone(response.data);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Phone:", error);
      });

    axios
      .get("http://localhost:8000/api/products/category/Furniture")
      .then((response) => {
        if (response && response.data) {
          setFurniture(response.data);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Furniture:", error);
      });

    const catWomen = "Women Wear";
    axios
      .get(`http://localhost:8000/api/products/category/${catWomen}`)
      .then((response) => {
        if (response && response.data) {
          setWomen(response.data);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Women Wear:", error);
      });

    const catMen = "Men Wear";
    axios
      .get(`http://localhost:8000/api/products/category/${catMen}`)
      .then((response) => {
        if (response && response.data) {
          setMen(response.data);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Men Wear:", error);
      });

    axios
      .get("http://localhost:8000/api/products/category/Kids")
      .then((response) => {
        if (response && response.data) {
          setKids(response.data);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Kid Section:", error);
      });

    axios
      .get("http://localhost:8000/api/products/category/More")
      .then((response) => {
        if (response && response.data) {
          setMore(response.data);
        } else {
          console.log("No data returned from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching Product:", error);
      });
  }, []);

  return (
    <div className="overall-cntnr">
      <Header />
      <div className="home-container" id="home-cntnr">
        <div>
          <Carousel />
        </div>

        <div>
          <div className="card" id="electronics">
            <ProductCardContainer
              products={electronics}
              cardTitle="Electronics"
            />
          </div>
          <div className="card" id="smartphone">
            <ProductCardContainer
              products={smartphone}
              cardTitle="SmartPhone"
            />
          </div>
          <div className="card" id="furniture">
            <ProductCardContainer products={furniture} cardTitle="Furnitures" />
          </div>
          <div className="card" id="men">
            <ProductCardContainer products={men} cardTitle="Men's Section" />
          </div>
          <div className="card" id="women">
            <ProductCardContainer
              products={women}
              cardTitle="Women's Section"
            />
          </div>
          <div className="card" id="kids">
            <ProductCardContainer products={kids} cardTitle="Kid's Section" />
          </div>
          <div className="card" id="more">
            <ProductCardContainer products={more} cardTitle="More Items" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
