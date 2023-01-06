import React, {useState} from 'react'
import {BiSearch} from 'react-icons/bi'
import '../styles/Navbar.scss'
import {Routes, Route, NavLink} from 'react-router-dom'
import Movies from './Movies'
import TVShows from './TVShows'
import Trends from './Trends'
export const Container = React.createContext()
function Navbar() {
    const [toggle, setToggle] = useState(true)
    const [inputValue, setInputValue] = useState('')
  return (
    <Container.Provider value={{toggle, inputValue}}>
    <>
        <nav id={toggle?'':'navBarColor'}>
            <div className="nav-options">
                <NavLink to="/" >
                    <h1 id={toggle?'':'heading'}>JoliMovie</h1>
                </NavLink>
                <NavLink to="/" style={({isActive})=>{return {color: isActive?'#EE9B00':' #fff'}}}>
                    <span>Movies</span>
                </NavLink>
                <NavLink to="/tvshows" style={({isActive})=>{return {color: isActive?'#EE9B00':' #fff'}}}>
                    <span>TV Shows</span>
                </NavLink>
                <NavLink to="/trends" style={({isActive})=>{return {color: isActive?'#EE9B00':' #fff'}}}>
                    <span>Trends</span>
                </NavLink>
            </div>
            <div className="input-group">
                <input type="text" placeholder='Search movie name' onChange={(e)=> setInputValue(e.target.value)}/>
                <BiSearch className='search-icon' id='search'/>
                <div id="theme-switch" onClick={()=>setToggle(!toggle)}>
                    <div id={toggle?"color-switcher-mover":"color-switcher-moved"}></div>
                </div>
            </div>
        </nav>
        <Routes>
            <Route path="" element={<Movies/>}/>
            <Route path="tvshows" element={<TVShows/>}/>
            <Route path="trends" element={<Trends/>}/>
        </Routes>
    </>
    </Container.Provider>
  )
}

export default Navbar