import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";



export const PlanetCard = () => {
  const { store, actions } = useContext(Context);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://swapi.tech/api/planets/");
      const data = await res.json();
      setPlanets(data.results);
    }
    fetchData();
  }, []);

  function handleFavorites(name) {
    store.favorites.includes(name) ? actions.removeFromFavorites(name) : actions.addToFavorites(name);
  }
  return (
    <div className="container d-flex col-10 overflow-auto mt-5 mx-auto">
      {planets?.map((planet, index) => (
        <div className="card" style={{ minWidth: "200px" }} key={index}>

          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-dark">{planet.name}</h5>
            <button className="btn btn-primary" onClick={() => handleFavorites(planet.name)}>
              <i className="far fa-heart"></i>
            </button>
            <Link to={"planetDescription/" + (index + 1)} className="btn btn-primary">Learn More</Link>
          </div>
        </div>
      ))}
    </div>
  );
};