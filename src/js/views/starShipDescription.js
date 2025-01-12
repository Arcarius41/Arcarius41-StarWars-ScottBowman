import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";



export const StarShipDescription = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [starship, setstarShip] = useState([]);
    console.log(id);
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
    let newID = findNewId(id);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://swapi.tech/api/starships/" + newID);
            const data = await res.json();
            setstarShip(data);
        }
        fetchData();
    }, []);
    return (
        <div className="container">
            <div className="row">{starship.name}</div>
            <div className="row">{starship.model}</div>
            <div className="row">{starship.manufacturer}</div>
            <div className="row">{starship.crew}</div>
            <div className="row">{starship.passengers}</div>

        </div>
    );
};
