import { useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Battle from './components/Battle'
import Gallery from './components/Gallery'
import GalleryTest from './components/GalleryTest'
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
          <NavLink to="/gallerytest" > GalleriTest </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/battle" element={<Battle />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallerytest" element={<GalleryTest />} />
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
