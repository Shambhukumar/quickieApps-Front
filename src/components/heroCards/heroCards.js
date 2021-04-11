import React, { useState, useEffect } from 'react'
import Axios from "axios"
import "./heroCards.css";
import {URL} from "../../dotenv";

const HeroCard = () => {
    const [data, setData] = useState();
    const firstLoad = async () => {
        const res = await Axios.get(`${URL}getdata`)
        setData(res.data.data.slice(0, 3))
        console.log(data)
    }

    useEffect(() => {
        firstLoad()
    }, [])
    return (
        <div className="container">
        {data ? data.map((e) => {
            return ( 
            
            <div className="hero-card"> 
                <div className="sym-logo">
                    <div className="sym">
                    {e.symbol}
                    </div>
                    <div className="logo">
                       <img alt="logo"  className="img" src={`/images/${e.symbol}.png`}/>
                    </div>
                </div>
                <div className="price">
                    {Math.round(e.CPrice)} USD
                </div>
                </div>

            )
        }) : null}
        
        </div>
    )
}

export default HeroCard