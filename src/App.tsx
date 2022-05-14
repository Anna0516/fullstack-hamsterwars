import { useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import BattlePage from './components/battle/BattlePage'
import Gallery from './hamstergallery/Gallery'

import Footer from './components/Footer'
import './App.css'

const App = () => {


  return (
    <div className='app'>
      <header>
        <nav className='nav'>
          <NavLink to="/" > Hem </NavLink>
          <NavLink to="/battle" > Tävla </NavLink>
          <NavLink to="/gallery" > Galleri </NavLink>

        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <footer>
        <div className='footer'>
          <Footer />
        </div>
      </footer>
    </div>
  )
}

export default App
