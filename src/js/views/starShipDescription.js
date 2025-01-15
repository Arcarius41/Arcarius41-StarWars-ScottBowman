import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const StarShipDescription = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [starship, setStarShip] = useState({});
    console.log("Old ID:", id);

    // Map old ID to new ID
    function findNewId(oldID) {
        const idMap = {
            1: 2,
            2: 3,
            3: 5,
            4: 9,
            5: 11,
            6: 12,
            7: 13,
            8: 15,
            9: 17
        };
        return idMap[oldID] || null;
    }
    const newID = findNewId(id);

    useEffect(() => {
        if (!newID) {
            console.error("Invalid ID mapping for:", id);
            return;
        }

        async function fetchData() {
            try {
                const res = await fetch(`https://swapi.tech/api/starships/${newID}`);
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data = await res.json();
                if (data.result) {
                    setStarShip(data.result.properties); // Access properties directly
                } else {
                    console.error("Starship data not found");
                }
            } catch (error) {
                console.error("Error fetching starship data:", error);
            }
        }
        fetchData();
    }, [newID]);

    return (
        <div className="container">
            {newID ? (
                <>
                    <h1>{starship.name}</h1>
                    <p><strong>Model:</strong> {starship.model}</p>
                    <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
                    <p><strong>Crew:</strong> {starship.crew}</p>
                    <p><strong>Passengers:</strong> {starship.passengers}</p>
                </>
            ) : (
                <p>Invalid Starship ID</p>
            )}
        </div>
    );
};
