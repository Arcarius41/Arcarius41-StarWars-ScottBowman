import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";



export const CharacterCard = () => {
  const { store, actions } = useContext(Context);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://swapi.tech/api/people/");
      const data = await res.json();
      setCharacters(data.results);
    }
    fetchData();
  }, []);

  function handleFavorites(name) {
    store.favorites.includes(name) ? actions.removeFromFavorites(name) : actions.addToFavorites(name);
  }
  return (
    <div className="container d-flex col-10 overflow-auto mt-5 mx-auto">
      {characters?.map((character, index) => (
        <div className="card" style={{ minWidth: "200px" }} key={index}>
          {console.log(character.name)}
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-dark">{character.name}</h5>
            <button className="btn btn-primary" onClick={() => handleFavorites(character.name)}>
              <i className="far fa-heart"></i>
            </button>
            <Link to={"characterDescription/" + (index + 1)} className="btn btn-primary">Learn More</Link>
          </div>
        </div>
      ))}
    </div>
  );
};