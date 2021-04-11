import React, {useState, useEffect} from 'react'
import {Link}  from "react-router-dom" 
import Axios from "axios"
import MaterialTable from 'material-table'
import {URL} from "../../dotenv"

import "./view.css";
import axios from 'axios';


const View = () => {
  
    const [data, setData] = useState();
    const firstLoad = async () =>{
        const res = await Axios.get(`${URL}getdata`)
        if(res.data.data.length !== 0){
          setData(res.data.data)
        }
      
     
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

    const OnDelete = async(id)=>{
        console.log(id)
        await axios.delete(`${URL}delete/${id}`)
        firstLoad();
    }

    return (
        <div className="container-view">
            
           {data && <div  className="table-view">
        <MaterialTable
          columns={[
            { title: 'COMPANY NAME', field: 'name' },
            { title: 'SYMBOL', field: 'symbol', render: (data) => <div className="symbol" > {data.symbol} </div> },
            { title: 'MARKET CAP', field: 'MCap', type: 'numeric', render: (data) => "$" +McapCalculator(data.MCap) },
            { title: "Save Data", field: 'birthCity', type: 'string', render: (data)=> <div className="button-delete" onClick={()=>OnDelete(data._id)} to="/home">Delete</div> },
            { title: 'CURRENT PRICE', field: 'CPrice', type: 'numeric', render: (data) => <div className="Current-price" > {Math.round(data.CPrice)} USD </div> },
          ]}
          options={{
            headerStyle:{backgroundColor: 'rgba(47, 139, 243, 0.425)', color: "rgb(102, 102, 102)"}
            }}
          data={data && data}
          title="Stock Details Table"
        />
      </div>}

      
      {!data ? <div className="empty">
        Please Wait few minutes while we update the data.
      </div>: <div className="button-back">
          <Link to="/home" className="button-back__text">Back</Link>
      </div>}
        </div>
    )

    
}

export default  View