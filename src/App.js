import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon1 from './search.svg'
import MovieCard from './MovieCard';

const apikey = process.env.REACT_APP_OMDB_API_KEY;
const API_URL = `http://www.omdbapi.com?apikey=${apikey}`;



const App = () => {
  

  const [movies, setMovies] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const searchMovies = async (title)=>{

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(()=>{
    searchMovies('batman');
  },[]);



  return (
   
      <div className='app'>
        <h1>MovieLand</h1>
        <div className='search'>
          <input 
            placeholder='enter keyword'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <img 
            src={SearchIcon1}
            alt='search'
            onClick={() =>  searchMovies(searchKeyword)}
          />
        </div>

        {
          movies?.length > 0 
          ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie = {movie} key={movie.Title}/>
              ))}
              
            </div>
          ) : (
            <div className='empty'>
              <h2>No Movies Found</h2>
            </div>
          )
        }

       

      </div>
    
  );
}

export default App;
