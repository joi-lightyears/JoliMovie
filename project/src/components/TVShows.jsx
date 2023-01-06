import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {FaPlay} from 'react-icons/fa'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import NoImg from '../images/noimage.png'
import { Container } from './Navbar'
import '../styles/Movies.scss'

function TVShows() {
  const [TVShowsData, setTVShowsData] = useState([])
  const {toggle, inputValue}=useContext(Container)
  const input= inputValue
  const [title, setTitle] = useState('')
  const shown= input?'search':'discover'
  const [vid, setVid] = useState(true)
  const api=`https://api.themoviedb.org/3/${shown}/tv`
  const images='https://image.tmdb.org/t/p/w500'

  const TVShows = async()=>{
    const data = await axios.get(api,{
      params:{
        api_key: '19059909c784d40ab6dfb12af2fd0001',
        query: input
      }
    })
    setTVShowsData(data.data.results)
  }
  useEffect(() => {
    TVShows()
  }, [input]);
  // console.log(TVShowsData)

  const TVShowsTitle=(show)=>{
    setTitle(show.name)
    setVid(!vid)
  }
  return (
    <>
    <div className={toggle?'mainBgColor':'secondaryBgColor'}>
      <div className="movies-container">
        {TVShowsData.map((show)=>{
          return(
            <>
              <div id={vid?'container':'NoContainer'}>
                <FaPlay  color='#fff' fontSize={40} id={vid?'playIcon':'hide'} onClick={()=>TVShowsTitle(show)}/>
                <img src={show.poster_path? `${images}${show.poster_path}`: NoImg} alt="film poster" onClick={()=>TVShowsTitle(show)}/>
                <h3 id='smaller-text'>{show.name}</h3>
              </div>
            </>
          )
        })}
      </div>
    </div>
      <AiOutlineCloseCircle id={toggle?'Nothing':"Exit1"}
      className={toggle?'Darktheme':'LightThemeClose'}
      fontSize={55} color='#fff' cursor='pointer'
       onClick={()=>setVid(true)}/>
    </>
  )
}

export default TVShows