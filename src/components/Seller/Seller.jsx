import React from 'react'

function Seller() {
  return (
    <div>
      <nav className="nav">
      <li className='logo'>
            <img src="/logo192.png" alt="logo" />
          </li>
        <ul className='header-list'>
          
          <li className='lnk'><a href="/">Home</a></li>
          <li className='lnk'><a href="/signin">SignIn</a></li>
          <li className='start-selling'><a href="/registerAdmin">Start Selling</a></li>
        </ul>
      </nav>
      <div className='seller-div'>
        Sell online with Flipkart
      </div>
    </div>
  )
}

export default Seller
