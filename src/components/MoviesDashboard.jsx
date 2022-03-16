import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import{getMovieData,filterByGenre} from "../Redux/actions"
import "./MoviesDashboard.css"
import { store } from "../Redux/store";

const genres = ["Comedy", "Thriller", "Drama", "Documentary", "Children"];

export const MoviesDashboard = () => {

  const movieStore = useSelector ((store) => store.filterData)
  const dispatch = useDispatch();
  console.log("redux all data", movieStore)
  
    // to get all movies list on component mounts
  // useEffect(() => {
  //   //   dispatch an action to the store 

  // }, [dispatch]);
  
  const navigate = useNavigate();

  const [allMovie, setAllMovies] = useState([]);
  // console.log(allMovie);

  useEffect( () => {
    axios({
      method: 'get',
      url: 'https://movie-fake-server.herokuapp.com/data',
    })
      .then(({data}) => {
        setAllMovies(data)
        dispatch(getMovieData(data));
      })
      
  },[])


  

//    filter by genre 
const handleFilter = (e)=>{
    console.log("handle",e.target.value)
    const payload = e.target.value;
    dispatch(filterByGenre(payload))

}
  return (
    <>
      <h2>Movies</h2>
      <select  onChange={handleFilter}>
        {genres.map(a => {
          return <option value={a}>{a}</option>
        })}
      </select>
      <div className = "movies-list">
        <table border="0">
        {allMovie.map(a => {
         return (
          <tr>
            <th>Movie Name:</th>
            <td onClick={() => {
              navigate(`/movies/${a.id}`)
            }}>{a.movie_name}</td>
            <th>Genre:</th>
            <td>{a.genre}</td>
            <th>Release:</th>
            <td>{a.release_date}</td>
          </tr>
         )
       })}
        </table>
       
      </div>
    </>
  );
};
