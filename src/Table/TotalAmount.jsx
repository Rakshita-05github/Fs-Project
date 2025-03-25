import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TotalAmount({ array, setArray, columns }) {
  const [dailyTotal, setDailyTotal] = useState(0);
  const [dailyRecords, setDailyRecords] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [pendingRecord, setPendingRecord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (columns.includes("Price")) {
      const total = array.reduce((sum, row) => sum + (parseFloat(row.Price) || 0), 0);
      setDailyTotal(total);
    }
  }, [array, columns]);

  function saveDailyTotal() {
    const today = new Date().toLocaleDateString();

    if (dailyRecords.length < 7) {
      setPendingRecord({ date: today, total: dailyTotal });
      setShowButtons(true);
    } else {
      alert("7 days completed! Weekly total is now calculated.");
    }
  }

  function confirmSave() {
    if (pendingRecord) {
      setDailyRecords([...dailyRecords, pendingRecord]);
      setPendingRecord(null);
      setShowButtons(false);
      setMessage("Submission successful!");

      setDailyTotal(0);
      setArray([]); // Clears the table data for new day
    }
  }

  function cancelSave() {
    setPendingRecord(null);
    setShowButtons(false);
  }

  const weeklyTotal =
    dailyRecords.length === 7
      ? dailyRecords.reduce((sum, record) => sum + record.total, 0)
      : 0;

  return (
    <div>
      <h3>Today's Total: {dailyTotal}</h3>

      {!showButtons && (
        <button onClick={saveDailyTotal} disabled={dailyRecords.length === 7}>
          Save Daily Total
        </button>
      )}

      {showButtons && (
        <>
          <p>Confirm submission?</p>
          <button onClick={confirmSave}>OK</button>
          <button onClick={cancelSave}>Close</button>
        </>
      )}

      {message && <p style={{ color: "green" }}>{message}</p>}

      <h3>Daily Records:</h3>
      <ul>
        {dailyRecords.map((record, index) => (
          <li key={index}>
            {record.date}: {record.total}
          </li>
        ))}
      </ul>

      {dailyRecords.length === 7 && (
        <>
          <h3>Weekly Total: {weeklyTotal}</h3>
          <button
            onClick={() => {
              setDailyRecords([]);
              setDailyTotal(0);
              setArray([]); // Reset table data for a new week
            }}
          >
            Reset Weekly Data
          </button>
        </>
      )}

      {/* Graph Visualization */}
      <h3>Weekly Total Graph</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailyRecords}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
