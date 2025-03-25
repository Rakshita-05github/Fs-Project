import React, { useState } from "react";
import TotalAmount from "./TotalAmount"; // Import TotalAmount component
import "./Table.css";


export default function Table2() {
  const [columns, setColumns] = useState([]); // Dynamic columns
  const [array, setArray] = useState([]); // Table rows
  const [inputdata, setInputdata] = useState({}); // Form input
  const [index, setIndex] = useState(null); // Index for update
  const [bolin, setBolin] = useState(false); // Mode: add/update
  const [newColumn, setNewColumn] = useState(""); // New column name

  // Handle input changes
  function handleInputChange(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  // Add new column dynamically
  function addColumn() {
    if (newColumn.trim() !== "" && !columns.includes(newColumn)) {
      setColumns([...columns, newColumn]);
      setInputdata({ ...inputdata, [newColumn]: "" });
    }
    setNewColumn("");
  }

  // Add a new row
  function addRow() {
    if (columns.length === 0) {
      alert("Please add at least one column first.");
      return;
    }
    if (Object.values(inputdata).some((val) => val === "")) {
      alert("Please fill all fields");
    } else {
      setArray([...array, { ...inputdata }]);
      setInputdata(Object.fromEntries(columns.map((col) => [col, ""])));
    }
  }

  // Delete row
  function deleteRow(i) {
    let updatedArray = [...array];
    updatedArray.splice(i, 1);
    setArray(updatedArray);
  }

  // Load update data
  function loadUpdateData(i) {
    setInputdata({ ...array[i] });
    setBolin(true);
    setIndex(i);
  }

  // Update row
  function updateRow() {
    let updatedArray = [...array];
    updatedArray[index] = { ...inputdata };
    setArray(updatedArray);
    setBolin(false);
    setInputdata(Object.fromEntries(columns.map((col) => [col, ""])));
  }

  return (
    <div>
      {/* Input & Button to Add Columns */}
      <input
        type="text"
        value={newColumn}
        placeholder="Enter column name"
        onChange={(e) => setNewColumn(e.target.value)}
      />
      <button onClick={addColumn}>Add Column</button>

      <br />

      {/* Dynamic Input Fields */}
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

      {/* Add / Update Button */}
      <button onClick={!bolin ? addRow : updateRow}>
        {!bolin ? "Add Row" : "Update Row"}
      </button>

      {/* Table Display */}
      <table border="1">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
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
              <td>
                <button onClick={() => loadUpdateData(i)}>Update</button>
              </td>
              <td>
                <button onClick={() => deleteRow(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Total Amount */}
      <TotalAmount array={array} setArray={setArray} columns={columns} />
    </div>
  );
}
