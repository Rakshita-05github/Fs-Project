import React, { useState } from 'react';

export default function Table2() {
    const [columns, setColumns] = useState([]); // Stores dynamic columns
    const [array, setArray] = useState([]); // Stores table rows
    const [inputdata, setInputdata] = useState({}); // Stores input form data
    const [index, setIndex] = useState(null); // Stores index of the row being updated
    const [bolin, setBolin] = useState(false); // Determines add/update mode
    const [newColumn, setNewColumn] = useState(""); // Stores new column name

    // Handles input changes dynamically
    function handleInputChange(e) {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });
    }

    // Adds a new column dynamically
    function addColumn() {
        if (newColumn.trim() !== "" && !columns.includes(newColumn)) {
            setColumns([...columns, newColumn]);
            setInputdata({ ...inputdata, [newColumn]: "" }); // Add new field to input data
        }
        setNewColumn(""); // Clear input
    }

    // Adds a new row to the table
    function addRow() {
        if (columns.length === 0) {
            alert("Please add at least one column first.");
            return;
        }
        if (Object.values(inputdata).some(val => val === "")) {
            alert("Please fill all fields");
        } else {
            setArray([...array, { ...inputdata }]);
            setInputdata(Object.fromEntries(columns.map(col => [col, ""])));
        }
    }

    // Deletes a row from the table
    function deleteRow(i) {
        let updatedArray = [...array];
        updatedArray.splice(i, 1);
        setArray(updatedArray);
    }

    // Loads data into the input fields for updating
    function loadUpdateData(i) {
        setInputdata({ ...array[i] });
        setBolin(true);
        setIndex(i);
    }

    // Updates the existing row in the table
    function updateRow() {
        let updatedArray = [...array];
        updatedArray[index] = { ...inputdata };
        setArray(updatedArray);
        setBolin(false);
        setInputdata(Object.fromEntries(columns.map(col => [col, ""])));
    }

   

    return (
        <div>
            {/* Input & Button to Add New Columns */}
            <input
                type="text"
                value={newColumn}
                placeholder="Enter column name"
                onChange={(e) => setNewColumn(e.target.value)}
            />
            <button onClick={addColumn}>Add Column</button>

            <br />

            {/* Input fields based on dynamic columns */}
            {columns.map((col, i) => (
                <input
                    key={i}
                    type="text"
                    value={inputdata[col] || ""}
                    name={col}
                    autoComplete="off"
                    placeholder={`Enter ${col}`}
                    onChange={handleInputChange}
                />
            ))}

            {/* Button for Adding or Updating Data */}
            <button onClick={!bolin ? addRow : updateRow}>
                {!bolin ? "Add Row" : "Update Row"}
            </button>

            {/* Table Display */}
            <table border="1">
                <thead>
                    <tr>
                        {columns.map((col, i) => <th key={i}>{col}</th>)}
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((row, i) => (
                        <tr key={i}>
                            {columns.map((col, j) => (
                                <td key={j}>{row[col]}</td>
                            ))}
                            <td><button onClick={() => loadUpdateData(i)}>Update</button></td>
                            <td><button onClick={() => deleteRow(i)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
