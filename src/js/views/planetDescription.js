import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetDescription = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [planet, setPlanet] = useState({});
    console.log("Planet ID:", id);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`https://swapi.tech/api/planets/${id}`);
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data = await res.json();
                if (data.result) {
                    setPlanet(data.result.properties);
                } else {
                    console.error("Planet data not found");
                }
            } catch (error) {
                console.error("Error fetching planet data:", error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div className="container">
            <h1>{planet.name}</h1>
            <p><strong>Gravity:</strong> {planet.gravity}</p>
            <p><strong>Climate:</strong> {planet.climate}</p>
            <p><strong>Terrain:</strong> {planet.terrain}</p>
            <p><strong>Population:</strong> {planet.population}</p>
        </div>
    );
};
