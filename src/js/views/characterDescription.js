import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterDescription = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    const { store, actions } = useContext(Context);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`https://swapi.tech/api/people/${id}`);
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data = await res.json();
                if (data.result) {
                    setCharacter(data.result.properties);
                } else {
                    console.error("Character data not found");
                }
            } catch (error) {
                console.error("Error fetching character data:", error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div className="container">
            <h1>{character.name}</h1>
            <p><strong>Height:</strong> {character.height}</p>
            <p><strong>Hair Color:</strong> {character.hair_color}</p>
            <p><strong>Eye Color:</strong> {character.eye_color}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
        </div>
    );
};
