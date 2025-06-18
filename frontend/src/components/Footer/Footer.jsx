import "./Footer.css";

function Footer() {
  return (
    <div className="footer-cntnr">
      <div className="footer-grid">
        <div className="col">
          <div className="hdng">ABOUT</div>
          <a href="/helpcentre">Contact Us</a>
          <a href="/aboutUs">About Us</a>
          <a href="/carrers">Careers</a>
          <a href="/stories">Stories</a>
          <a href="/press">Press</a>
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
          <a href="/orders">Payments</a>
          <a href="/pages/shipping">Shipping</a>
          <a href="/helpcentre">Cancellation & Returns</a>
          <a href="/helpcentre">FAQ</a>
        </div>

        <div className="col">
          <div className="hdng">CONSUMER POLICY</div>
          <a href="/returnpolicy">Return Policy</a>
          <a href="/terms">Terms Of Use</a>
          <a href="/paymentsecurity">Security</a>
          <a href="/policies">Privacy</a>
          <a href="/sitemap">Sitemap</a>
          <a href="/grievance-redressal-mechanism">Grievance Redressal</a>
        </div>

        <div className="col">
          <div className="hdng">Mail Us:</div>
          <p>Internet Private Limited,</p>
          <p>Buildings Alyssa, Begonia & Clove Embassy Village,</p>
          <p>
            Outer Ring Road, ABC Village, Bengaluru, 560103, Karnataka, India
          </p>
        </div>

        <div className="col">
          <div className="hdng">Registered Office Address:</div>
          <p>Internet Private Limited,</p>
          <p>Buildings Assss, Begonia & Clove Embassy Village,</p>
          <p>
            Outer Ring Road, ABC Village, Bengaluru, 560103, Karnataka, India
          </p>
          <p>CIN: U51109KA2000000007</p>
          <p>
            Telephone: <a href="tel:044-45614700">044-45600000</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-links">
          <a href="/seller" aria-label="Become a Seller">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-9de8ef.svg"
              alt="Become a Seller"
            />
            <span>Become a Seller</span>
          </a>
          <a href="https://brands.com" aria-label="Advertise">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-866c0b.svg"
              alt="Advertise"
            />
            <span>Advertise</span>
          </a>
          <a href="/the-gift-card-store" aria-label="Gift Cards">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"
              alt="Gift Cards"
            />
            <span>Gift Cards</span>
          </a>
          <a href="/helpcentre" aria-label="Help Center">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-c4ace8.svg"
              alt="Help Center"
            />
            <span>Help Center</span>
          </a>
        </div>

        <div className="footer-legal">
          <span style={{ flexWrap: "nowrap" }}>© 2007-25 Ecommerce.com</span>
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
