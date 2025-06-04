import "./ShortLink.css";

function ShortLink() {
  const goToSection = (sectionId) => {
    window.location.href = `/home#${sectionId}`;
  };
  return (
    <div className="shrt-cont">
      <div className="shrt-lnk-elements">
        <span
          className="shrt-lnk-element"
          onClick={() => goToSection("home-cntnr")}
        >
          Home
        </span>
        <span
          className="shrt-lnk-element"
          onClick={() => goToSection("electronics")}
        >
          Electronics
        </span>
        <span
          className="shrt-lnk-element"
          onClick={() => goToSection("electronics")}
        >
          TVs &amp; Appliances
        </span>
        <span className="shrt-lnk-element" onClick={() => goToSection("men")}>
          Men
        </span>
        <span className="shrt-lnk-element" onClick={() => goToSection("women")}>
          Women
        </span>
        <span className="shrt-lnk-element" onClick={() => goToSection("kids")}>
          Baby &amp; Kids
        </span>

        <span className="shrt-lnk-element" onClick={() => goToSection("more")}>
          Sports, Books &amp; More
        </span>
      </div>
    </div>
  );
}

export default ShortLink;
