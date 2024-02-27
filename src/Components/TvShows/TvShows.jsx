import React, {useEffect, useState} from "react";
import  axios  from 'axios';
export default function TvShows() {
    const [tvs, setTvs] = useState([]);
    async function tvShows() {
        let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=********************************');
        setTvs(data.results);
    }
    useEffect(() => {
        tvShows();
    }, []);
    return <>
        <div className="container">
            <div className="row align-items-center">
               <div className="col-md-4">
                    <div className="title">
                        <h3>Trending TV to watch now</h3>
                        <p className="text-gray opacity-25">Most watched movies by days</p>
                    </div>
               </div>
                {tvs?.map((tv, ind) => <>
                    <div key={ind} className="col-md-2">
                        <div className="tv">
                            <img className="w-100" src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`} alt={`${tv.name}`} />
                            <h1>{tv.name}</h1>
                        </div>
                    </div>
                </>)}
            </div>
        </div>
    </>
}