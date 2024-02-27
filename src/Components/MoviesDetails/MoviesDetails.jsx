import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export default function MoviesDetails() {
    let {id} = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    async function getMovieDetails() {
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=********************************`);
        setMovieDetails(data);
    }
    useEffect(() => {
        getMovieDetails();
    }, []);
    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="image">
                        <img className='w-100' src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} alt={`${movieDetails.title}`} />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="details pt-4">
                        <h3 className='pb-3 fs-2'>{movieDetails.original_title}</h3>
                        <p className='pb-3 fs-6'>{movieDetails.tagline}</p>
                        {movieDetails.genres?.map((genre, ind) => {
                            <span key={ind} className="bg-info me-3 p-3 text-white">
                                {genre.name.id}
                            </span>
                        })}
                        <p className='pb-3 fs-6'>Vote : {movieDetails.vote_average}</p>
                        <p className='pb-3 fs-6'>Vote Count : {movieDetails.vote_count}</p>
                        <p className='pb-3 fs-6'>Popularity : {movieDetails.popularity}</p>
                        <p className='pb-3 fs-6'>Release Date : {movieDetails.release_date}</p>
                        <p className='pb-3 fs-6'>{movieDetails.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}