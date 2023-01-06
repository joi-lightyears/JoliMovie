import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {FaPlay} from 'react-icons/fa'
import NoImg from '../images/noimage.png'
import '../styles/Movies.scss'
import { Container } from './Navbar'
import {AiOutlineCloseCircle} from 'react-icons/ai'

function Movies() {
    const {toggle, inputValue}=useContext(Container)
    const input = inputValue
    const [moviesData, setMoviesData] = useState([])
    const [vid, setVid] =useState(true)
    const shown= input?'search':'discover'
    const api=`https://api.themoviedb.org/3/${shown}/movie`
    const images='https://image.tmdb.org/t/p/w500'
    const [title, setTitle] = useState('')

    const MovieCall=async()=>{
        const data =await axios.get(api,{
            params:{
                api_key: '19059909c784d40ab6dfb12af2fd0001',
                query: input
            }
        })
        setMoviesData(data.data.results)
    }
    useEffect(() => {
        MovieCall()
    }, [input]);
    // console.log(moviesData)
    const MovieTitle=(show)=>{
        setTitle(show.name)
        setVid(!vid)
      }
  return (
    <>
    <div className={toggle?'mainBgColor':'secondaryBgColor'}>
        <div className="movies-container">
            {moviesData.map((movie)=>{
                return(
                    <>
                        <div id={vid?'container':'NoContainer'}>
                            <FaPlay color='white' fontSize={40} id={vid?'playIcon':'hide'} onClick={()=>MovieTitle(movie)}/>
                            <img src={movie.poster_path? `${images}${movie.poster_path}`: NoImg} alt="" onClick={()=>MovieTitle(movie)}/>
                            <h3 id='smaller-text'>{movie.title}</h3>
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

export default Movies