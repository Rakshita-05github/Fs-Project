import React, { useState } from 'react';

export default function Table2() {
    let [array, setArray] = useState([]);
    let [inputdata, setInputdata] = useState({ name: "", number: "" });
    let [index, setIndex] = useState();
    let [bolin, setBolin] = useState(false);
    let { name, number } = inputdata;

    function data(e) {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });
    }

    function addinputdata() {
        if (name === "" || number === "") {
            alert("Enter Name and Number");
        } else {
            setArray([...array, { name, number: Number(number) }]);
            setInputdata({ name: "", number: "" });
        }
    }

    function deletedata(i) {
        let total = [...array];
        total.splice(i, 1);
        setArray(total);
    }

    function updatedata(i) {
        let { name, number } = array[i];
        setInputdata({ name, number });
        setBolin(true);
        setIndex(i);
    }

    function updateinfo() {
        let total = [...array];
        total.splice(index, 1, { name, number: Number(number) });
        setArray(total);
        setBolin(false);
        setInputdata({ name: "", number: "" });
    }

    const totalSum = array.reduce((sum, item) => sum + item.number, 0);

    return (
        <div>
            <input type="text" value={inputdata.name || ""} name='name' autoComplete='off' placeholder='Enter Name' onChange={data} />
            <input type="number" value={inputdata.number || ""} name="number" placeholder='Enter Number' onChange={data} />
            <button onClick={!bolin ? addinputdata : updateinfo}>{!bolin ? `Add data` : `Update data`}</button>

            <br />

            <table border="1">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                {

array && array.map(
(item,i)=>{
    return(
        <tr key={i}>
            <td>{item.name}</td>
            <td>{item.number}</td>
            <td><button onClick={()=>updatedata(i)}>update</button></td>
            <td><button onClick={()=>deletedata(i)}>Delete</button></td>
        </tr>
    )
}
)

                }







                </tbody>
            </table>
            
            <h3>Total: {totalSum}</h3>
        </div>
    );
}
