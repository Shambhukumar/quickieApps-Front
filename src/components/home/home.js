import React, {useState, useEffect} from 'react'
import {Link}  from "react-router-dom" 
import Axios from "axios"
import MaterialTable from 'material-table'
import {URL} from "../../dotenv"

import "./home.css";


const Home = () => {
  
    const [data, setData] = useState();
    const firstLoad = async () =>{
        const res = await Axios.get(`${URL}getdata`)
        setData(res.data.data)
       data && console.log(data)
    }
    
    useEffect(() => {
        firstLoad()
    }, [])
    const McapCalculator = (x)=> {
      if(isNaN(x)) return x;
    
      if(x < 9999) {
        return x;
      }
    
      if(x < 1000000) {
        return Math.round(x/1000) + "K";
      }
      if( x < 10000000) {
        return (x/1000000).toFixed(2) + "M";
      }
    
      if(x < 1000000000) {
        return Math.round((x/1000000)) + "M";
      }
    
      if(x < 1000000000000) {
        return Math.round((x/1000000000)) + "B";
      }
    
      return "1T+";
    }

    return (
        <div className="container-home">
            
           <div style={{ minWidth: '85%' }} className="table-home">
        <MaterialTable
          columns={[
            { title: 'COMPANY NAME', field: 'name' },
            { title: 'SYMBOL', field: 'symbol', render: (data) => <div className="symbol" > {data.symbol} </div> },
            { title: 'MARKET CAP', field: 'MCap', type: 'numeric', render: (data) => "$" +McapCalculator(data.MCap) },
            { title: "Save Data", field: 'birthCity', type: 'string', render: ()=> <Link className="button-view" to="/view">View</Link> },
            { title: 'CURRENT PRICE', field: 'CPrice', type: 'numeric', render: (data) => <div className="Current-price" > {Math.round(data.CPrice)} USD </div> },
          ]}
          options={{
            headerStyle:{backgroundColor: 'rgba(47, 139, 243, 0.425)', color: "rgb(102, 102, 102)"}
            }}
          data={data && data}
          title="Stock Details Table"
        />
      </div>
      <div className="button-home">
        <Link to="/view" className="button-home-view">View Saved Data</Link>
      </div>
        </div>
    )

    
}

export default  Home