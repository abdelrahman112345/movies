import React, {useEffect, useState} from "react";
import  axios  from 'axios';
export default function Movies() {
    const [movies, setMovies] = useState([]);
    async function movieAPI () {
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=********************************');
        setMovies(data.results);
    }
    useEffect(() => {
        movieAPI();
    }, []);

    return <>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <div className="title">
                        <h3>Trending movies to watch now</h3>
                        <p className="text-gray opacity-25">Most watched movies by days</p>
                    </div>
                </div>
                {movies?.map((movie, ind) => <>
                    <div key={ind} className="col-md-2">
                        <div className="movie">
                            <img className="w-100" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title}`} />
                            <h5>{movie.title}</h5>
                        </div>
                    </div>
                </>)}
            </div>
        </div>
    </>
}