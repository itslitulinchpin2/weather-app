import React from 'react'
import { Button } from 'react-bootstrap'

const WeatherButton = ({cities,setCity}) => {
  

  return (
    
    <div>
      <Button variant='warning' onClick={()=>{setCity("")}}>Current Location</Button>

      {cities.map((data)=>(
        <Button variant='warning' onClick={
          ()=>{
            setCity(data);
          }
        }>{data}</Button>
      ))}

    </div>
 
  )
    }

export default WeatherButton;
