import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./Home.css";
import Carousel from "../Carousel/Carousel";
import ProductCardContainer from "../Product/Product";
import axios from "axios";

function Home() {
  const [electronics, setElectronics] = useState([]);
  const [smartphone, setSmartphone] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/electronics")
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
      .get("http://localhost:8000/api/smartphone")
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
  }, []);
  console.log({ electronics });
  console.log({ smartphone });

  return (
    <div className="overall-cntnr">
      <Header />
      <div className="home-container">
        {/* <div className="shortcut"></div> */}
        <div
        // className="carousel"
        >
          <Carousel />
        </div>
        <div
        // className="electronics"
        >
          {/* {fetchedData}
          console.log({fetchedData});
          <ul>
            {fetchedData.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul> */}
        </div>
        <div
        // className="beauty-food-toys"
        >
          <div className="card">
            <ProductCardContainer
              products={electronics}
              cardTitle="Electronics"
            />
          </div>
          <div className="card">
            <ProductCardContainer
              products={smartphone}
              cardTitle="SmartPhone"
            />
          </div>
        </div>
        {/* <div className="offers">
        <div className="festive-must-have"></div>
        <div className="offer"></div>
        <div className="seasons"></div>
        <div className="seasonal-appliance"></div>
        <div className="home-decor"></div>
        <div className="gift"></div>
        <div className="season-fashion"></div>
        <div className="current"></div>
      </div>
      <div className="grooming"></div>
      <div className="furniture"></div>
      <div className="offers">
        <div className="travel-essential"></div>
        <div className="offer"></div>
      </div>
      <div className="fashion-top-deals"></div>
      <div className="top-deals"></div>
      <div className="style"></div>
      <div className="deal-on-appliance"></div> */}
      </div>
    </div>
  );
}

export default Home;
