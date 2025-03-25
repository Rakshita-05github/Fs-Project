import React, { useState } from "react";
import "./Table.css";

export default function Table() {
    let [array, setArray] = useState([]); // Empty array to store data
    let [boolin, setBoolin] = useState(false); // State to track if updating or adding
    let [index, setIndex] = useState(); // Stores the index of row being updated
    let [inputdata, setInputdata] = useState({ name: "", number: "" }); // Stores input data
    let { name, number } = inputdata; // Destructuring for easier access

    function handledatas(e) {
        setInputdata({
            ...inputdata,
            [e.target.name]: e.target.value
        });
    }

    // Insert Data
    function addinfo() {
        if (name === "" || number === "") {
            alert("Enter Name and Roll no");
        } else {
            setArray([...array, { name, number }]);
            setInputdata({ name: "", number: "" }); // Clear input fields
        }
    }

    // Delete Data
    function delfunc(i) {
        let total = [...array];
        total.splice(i, 1); // Remove one element at index `i`
        setArray(total);
    }

    // Load Data into Input Fields for Updating
    function update(i) {
        let { name, number } = array[i]; // Get data at selected index
        setInputdata({ name, number });
        setBoolin(true);
        setIndex(i);
    }

    // Update Data at Specific Index
    function updateinfo() {
        let total = [...array];
        total.splice(index, 1, { name, number }); // Replace with new data
        setArray(total);
        setBoolin(false); // Reset button to "Add data"
        setInputdata({ name: "", number: "" }); // Clear input fields
    }
    //startIndex → The index where changes should begin.
// deleteCount → The number of elements to remove.
// itemToAdd (optional) → The new item to insert at startIndex.

    return (
        <>
            <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Enter Name"
                 className="column-input"
                onChange={handledatas}
                value={name}
            />
            <input
                type="number"
                name="number"
                autoComplete="off"
                placeholder="Enter Number"
                onChange={handledatas}
                value={number}
            />
           <button className="add-btn" onClick={boolin ? updateinfo : addinfo}>
  {boolin ? `Update data` : `Add data`}
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

                    {array.map((item, i) => (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.number}</td>
                            <td><button onClick={() => update(i)}>Update</button></td>
                            <td><button onClick={() => delfunc(i)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}


// In React, the onChange event is used to update the component's state whenever the user types in an input field. Without it, React would not know what the user is entering, and the values would not be stored.