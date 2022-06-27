import React, { useState,useEffect } from 'react'
import axios from './axios';
import "./Row.css";
import YouTube from 'react-youtube';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl,isLargeRow}) {

    const [movies,setMovies] = useState([]);

    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        autoplay: 1,
      },
    };


    useEffect(() => {
      async function fetchData(){
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        console.log(request);
      }
      fetchData();
    }, [fetchUrl])

    const [hovered,setHovered] = useState(false);

    function handlehover(movie){
    
      setHovered(true);
      console.log(movie?.name||movie?.title);
    }
    
  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className="row_posters">
            {movies.map(movie =>(
              
                <img 
                key={movie.id}
                onMouseOver = {() =>handlehover(movie)}
                onMouseOut={() => {console.log("closed");setHovered(false);}}
                className={ `row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${base_url}${isLargeRow ? movie.poster_path:movie.backdrop_path}`} alt = {movie.name}/>
            ))}
        </div>
    </div>
  )
}

export default Row;