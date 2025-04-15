import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-cntnr">
      <div className="footer-grid">
        <div className="col">
          <div className="hdng">ABOUT</div>
          <a href="/helpcentre">Contact Us</a>
          <a href="https://corporate.flipkart.net">About Us</a>
          <a href="https://www.flipkartcareers.com">Careers</a>
          <a href="http://stories.flipkart.com">Flipkart Stories</a>
          <a href="http://stories.flipkart.com/category/top-stories/news/">
            Press
          </a>
          <a href="/corporate-information">Corporate Information</a>
        </div>

        <div className="col">
          <div className="hdng">GROUP COMPANIES</div>
          <a
            href="https://www.myntra.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Myntra
          </a>
          <a
            href="https://www.cleartrip.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cleartrip
          </a>
          <a
            href="https://www.shopsy.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shopsy
          </a>
        </div>

        <div className="col">
          <div className="hdng">HELP</div>
          <a href="/pages/payments">Payments</a>
          <a href="/pages/shipping">Shipping</a>
          <a href="/helpcentre?catalog=55c9c6edb000002e002c1701">
            Cancellation & Returns
          </a>
          <a href="/helpcentre?catalog=55c9c8e2b0000023002c1702">FAQ</a>
        </div>

        <div className="col">
          <div className="hdng">CONSUMER POLICY</div>
          <a href="/pages/returnpolicy">Return Policy</a>
          <a href="/pages/terms">Terms Of Use</a>
          <a href="/pages/paymentsecurity">Security</a>
          <a href="/pages/privacypolicy">Privacy</a>
          <a href="/sitemap">Sitemap</a>
          <a href="/pages/grievance-redressal-mechanism">Grievance Redressal</a>
        </div>

        <div className="col">
          <div className="hdng">Mail Us:</div>
          <p>Flipkart Internet Private Limited,</p>
          <p>Buildings Alyssa, Begonia & Clove Embassy Tech Village,</p>
          <p>
            Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103,
            Karnataka, India
          </p>
        </div>

        <div className="col">
          <div className="hdng">Registered Office Address:</div>
          <p>Flipkart Internet Private Limited,</p>
          <p>Buildings Alyssa, Begonia & Clove Embassy Tech Village,</p>
          <p>
            Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103,
            Karnataka, India
          </p>
          <p>CIN: U51109KA2012PTC066107</p>
          <p>
            Telephone: <a href="tel:044-45614700">044-45614700</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-links">
          <a
            href="https://seller.flipkart.com/?utm_source=fkwebsite&amp;utm_medium=websitedirect"
            aria-label="Become a Seller"
          >
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-9de8ef.svg"
              alt="Become a Seller"
            />
            <span>Become a Seller</span>
          </a>
          <a href="https://brands.flipkart.com" aria-label="Advertise">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-866c0b.svg"
              alt="Advertise"
            />
            <span>Advertise</span>
          </a>
          <a
            href="/the-gift-card-store?otracker=footer_navlinks"
            aria-label="Gift Cards"
          >
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"
              alt="Gift Cards"
            />
            <span>Gift Cards</span>
          </a>
          <a
            href="/helpcentre?otracker=footer_navlinks"
            aria-label="Help Center"
          >
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-c4ace8.svg"
              alt="Help Center"
            />
            <span>Help Center</span>
          </a>
        </div>

        <div className="footer-legal">
          <span style={{ flexWrap: "nowrap" }}>© 2007-25 Flipkart.com</span>
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
            alt="Payment Methods"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
