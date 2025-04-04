import React from "react";
import Header from "../Header/Header";
import "./Home.css";
// import axios from "axios";
import Carousel from "../Carousel/Carousel";
import ProductCardContainer from "../Product/Product";
import Electronics from "../Product/Electronics";
import SmartPhone from "../Product/SmartPhone";

function Home() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // fetch("http://localhost:8000/api/product")
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("Failed to fetch data:", error));

  // const fetchedData = useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/api/product");
  //       setData(response.data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
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
              products={Electronics}
              cardTitle="Electronics"
            />
          </div>
          <div className="card">
            <ProductCardContainer
              products={SmartPhone}
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
