import React, {useEffect, useState, useContext} from 'react'
import { Container } from './Navbar'
import axios from 'axios'
import NoImg from '../images/noimage.png'
import {FaPlay} from 'react-icons/fa'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import '../styles/Movies.scss'

function Trends() {
  const {toggle, inputValue}=useContext(Container)
  const input= inputValue
  const shown= input?'search':'discover'
  const [title, setTitle] = useState('')
  const [trending, setTrending] = useState([])
  const api='https://api.themoviedb.org/3'
  const images='https://image.tmdb.org/t/p/w500'
  const trendsShown = '/trending/all/week'
  const [vid, setVid] = useState(true)

  const Trends=async()=>{
    const data= await axios.get(`${api}${trendsShown}`,{
      params:{
        api_key: '19059909c784d40ab6dfb12af2fd0001',
      }
    })
    setTrending(data.data.results)
  }
  useEffect(()=>{
    Trends()
  },[])
  console.log(trending)
  const TrendTitle=(trend)=>{
    setTitle(trend.title)
    setVid(!vid)
  }
  return (
    <>
    <div className={toggle?'mainBgColor':'secondaryBgColor'}>
      <div className="movies-container">
        {trending.map((trend)=>{
          return(
            <>
              <div id={vid?'container':'NoContainer'}>
                <FaPlay  color='#fff' fontSize={40} id={vid?'playIcon':'hide'} onClick={()=>TrendTitle(trend)}/>
                <img src={trend.poster_path? `${images}${trend.poster_path}`: NoImg} alt="film poster" onClick={()=>TrendTitle(trend)}/>
                <h3 id='smaller-text'>{trend.title}</h3>
              </div>
            </>
          )
        })}
      </div>
    </div>
      <AiOutlineCloseCircle id={vid?'Nothing':"Exit1"}
      className={toggle?'Darktheme':'LightThemeClose'}
      fontSize={55} color='#fff' cursor='pointer'
       onClick={()=>setVid(true)}/>
    </>
  )
}

export default Trends