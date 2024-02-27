import React, {useEffect, useState} from "react";
import  axios  from 'axios';
import { Link } from 'react-router-dom';
export default function Home () {
    const [movies, setMovies] = useState([]);
    const [tvs, setTvs] = useState([]);
    async function movieAPI () {
        let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=********************************');
        setMovies(data.results);
    }
    async function tvShows() {
        let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=********************************');
        setTvs(data.results);
    }
    useEffect(() => {
        movieAPI();
        tvShows();
    }, []);

    return <>
        {movies.length > 0 && tvs.length > 0 ? <>
            <div className="container">
            <div className="row d-flex align-items-center">
                <div className="col-md-4">
                    <div className="title">
                        <h3>Trending movies to watch now</h3>
                        <p className="text-gray opacity-25">Most watched movies by days</p>
                    </div>
                </div>
                {movies?.map((movie, ind) => <>  
                    <div key={ind} className="col-md-2">
                        <Link to={`/details/${movie.id}`}>
                            <div className="movie">
                                <img className="w-100" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title}`} />
                                <h5>{movie.title}</h5>
                            </div>
                        </Link>
                    </div> 
                </>)}
            </div>
            <div className="row align-items-center">
               <div className="col-md-4">
                    <div className="title">
                        <h3>Trending TV to watch now</h3>
                        <p className="text-gray opacity-25">Most watched movies by days</p>
                    </div>
               </div>
                {tvs?.map((tv, ind) => <>
                    <div key={ind} className="col-md-2">
                        <Link to = {`/details/${tv.id}`} >
                            <div className="tv">
                                <img className="w-100" src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`} alt={`${tv.name}`} />
                                <h1>{tv.name}</h1>
                            </div>
                        </Link> 
                    </div>
                </>)}
            </div>
            </div>
        </> : <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-spinner fa-5x fa-spin text-white"></i>
            </div>
        </>}
    </>
}