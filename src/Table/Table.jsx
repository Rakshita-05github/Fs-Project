import React from 'react'
import './Table.css'
import { useState } from 'react';

export default function Table(){

    let [array,setArray]=useState([]) //Empty array is initialized first
    let [boolin, setBoolin] = useState(false); //boolin is declared as false at first
    let[index,setIndex]=useState();
   let [inputdata, setInputdata] = useState({ name: "", number: "" });
   let { name, number } = inputdata; //array destructuring { name, number }: Extracts values from input data for easy access.
    
    function handledatas(e){
        setInputdata({
            ...inputdata,
            [e.target.name]:e.target.value
        });
    }




    return(
        <>
        
        <input type ="text" name='name'  autoComplete='off' placeholder='Enter Name' /> 
        <input type="number" name='number' autoComplete='off' placeholder='Enter Number'  />
{/* onChange={data} */}


        <button onClick={boolin? update:addinfo}>
            {boolin?`Update data`:`Add data`}

            {/* Change the button value accordingly for update or add */}
        </button>

{/* CREATE TABLE */}

<table border="1">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>

{array.map((item,i)=>{

    <tr key={i}>
        <td>{item.name}</td>
        <td>{item.number}</td>
        <td><button onClick={()=>update(i)}>Update</button></td>
        <td><button onClick={()=>delfunc(i)}>Delete</button></td>
    </tr>
})}

{/* Iterates over array and displays each row. */}




</tbody>
</table>
        </>
    );
}