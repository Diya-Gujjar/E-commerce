import React, { useState } from "react";
import "./ShortLink.css";
import { RiArrowDropDownLine } from "react-icons/ri";

function ShortLink() {
  const [electronicsHovered, setElectronicsHovered] = useState(false);
  const [tvHovered, setTvHovered] = useState(false);
  const [menHovered, setMenHovered] = useState(false);
  const [womenHovered, setWomenHovered] = useState(false);
  const [kidHovered, setKidHovered] = useState(false);
  const [furnitureHovered, setFurnitureHovered] = useState(false);
  const [moreHovered, setMoreHovered] = useState(false);

  return (
    <div className="shrt-cont">
      <div className="shrt-lnk-elements">
        <span
          className="shrt-lnk-element"
          onMouseEnter={() => setElectronicsHovered(true)}
          onMouseLeave={() => setElectronicsHovered(false)}
        >
          Electronics{" "}
          <RiArrowDropDownLine
            style={{
              transform: electronicsHovered ? "rotate(180deg)" : "rotate(0deg)",
            }}
            className={`arrow-down ${electronicsHovered ? "rotate" : ""}`}
          />
        </span>
        <span
          className="shrt-lnk-element"
          onMouseEnter={() => setTvHovered(true)}
          onMouseLeave={() => setTvHovered(false)}
        >
          TVs &amp; Appliances
          <RiArrowDropDownLine
            style={{ transform: tvHovered ? "rotate(180deg)" : "rotate(0deg)" }}
            className={`arrow-down ${tvHovered ? "rotate" : ""}`}
          />
        </span>
        <span
          className="shrt-lnk-element"
          onMouseEnter={() => setMenHovered(true)}
          onMouseLeave={() => setMenHovered(false)}
        >
          Men{" "}
          <RiArrowDropDownLine
            style={{
              transform: menHovered ? "rotate(180deg)" : "rotate(0deg)",
            }}
            className={`arrow-down ${menHovered ? "rotate" : ""}`}
          />
        </span>
        <span
          className="shrt-lnk-element"
          onMouseEnter={() => setWomenHovered(true)}
          onMouseLeave={() => setWomenHovered(false)}
        >
          Women{" "}
          <RiArrowDropDownLine
            style={{
              transform: womenHovered ? "rotate(180deg)" : "rotate(0deg)",
            }}
            className={`arrow-down ${womenHovered ? "rotate" : ""}`}
          />
        </span>
        <span
          className="shrt-lnk-element"
          onMouseEnter={() => setKidHovered(true)}
          onMouseLeave={() => setKidHovered(false)}
        >
          Baby &amp; Kids{" "}
          <RiArrowDropDownLine
            style={{
              transform: kidHovered ? "rotate(180deg)" : "rotate(0deg)",
            }}
            className={`arrow-down ${kidHovered ? "rotate" : ""}`}
          />
        </span>
        <span
          className="shrt-lnk-element"
          onMouseEnter={() => setFurnitureHovered(true)}
          onMouseLeave={() => setFurnitureHovered(false)}
        >
          Home &amp; Furniture{" "}
          <RiArrowDropDownLine
            style={{
              transform: furnitureHovered ? "rotate(180deg)" : "rotate(0deg)",
            }}
            className={`arrow-down ${furnitureHovered ? "rotate" : ""}`}
          />
        </span>
        <span
          className="shrt-lnk-element"
          onMouseEnter={() => setMoreHovered(true)}
          onMouseLeave={() => setMoreHovered(false)}
        >
          Sports, Books &amp; More{" "}
          <RiArrowDropDownLine
            style={{
              transform: moreHovered ? "rotate(180deg)" : "rotate(0deg)",
            }}
            className={`arrow-down ${moreHovered ? "rotate" : ""}`}
          />
        </span>
        <a
          className="shrt-lnk-element"
          href="/travel/flights?otracker=nmenu_Flights"
        >
          Flights
        </a>
        <a
          className="shrt-lnk-element"
          href="/offers-list/top-deals?screen=dynamic&amp;pk=themeViews%3DDT-OMU-A2%3ADT-OMU~widgetType%3DdealCard~contentType%3Dneo&amp;otracker=nmenu_offer-zone"
        >
          Offer Zone
        </a>
      </div>
    </div>
  );
}

export default ShortLink;
