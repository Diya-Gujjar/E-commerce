import React from 'react'
import "../App.css"

function Header() {
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <ul className='header-list'>
            <li className='lnk'><a href="/">Home</a></li>
            <li className='lnk'><a href="/register">Register</a></li>
            <li className='lnk'><a href="/signin">SignIn</a></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header