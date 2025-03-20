import React, { useEffect, useState } from "react";

export default function TotalAmount({ array, columns }) {
  const [dailyTotal, setDailyTotal] = useState(0);
  const [dailyRecords, setDailyRecords] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [pendingRecord, setPendingRecord] = useState(null);
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (columns.includes("Price")) {
      const total = array.reduce((sum, row) => sum + (parseFloat(row.Price) || 0), 0);
      setDailyTotal(total);
    }

    // Check if today's date has already been saved
    const lastSavedDate = localStorage.getItem("lastSavedDate");
    const today = new Date().toLocaleDateString();

    if (lastSavedDate === today) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [array, columns]);

  function saveDailyTotal2() {
    const today = new Date().toLocaleDateString();

    if (dailyRecords.length < 7) {
      setPendingRecord({ date: today, total: dailyTotal });
      setShowButtons(true);
    } else {
      alert("7 days completed! Weekly total is now calculated.");
    }
  }

  function okfunc() {
    if (pendingRecord) {
      setDailyRecords([...dailyRecords, pendingRecord]);
      setPendingRecord(null);
      setShowButtons(false);
      setMessage("Submission successful!");

      // Disable button and store today's date
      setIsButtonDisabled(true);
      localStorage.setItem("lastSavedDate", new Date().toLocaleDateString());
    }
  }

  function closefunc() {
    setPendingRecord(null);
    setShowButtons(false);
  }

  const weeklyTotal = dailyRecords.length === 7 ? dailyRecords.reduce((sum, record) => sum + record.total, 0) : 0;

  return (
    <div>
      <h3>Today's Total: {dailyTotal}</h3>

      {/* Save Daily Total Button - Disabled if already saved today */}
      {!showButtons && (
        <button onClick={saveDailyTotal2} disabled={isButtonDisabled || dailyRecords.length === 7}>
          Save Daily Total
        </button>
      )}

      {/* Show OK and Close Buttons after clicking Save Daily Total */}
      {showButtons && (
        <>
          <p>Confirm submission?</p>
          <button onClick={okfunc}>OK</button>
          <button onClick={closefunc}>Close</button>
        </>
      )}

      {/* Show message */}
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
          <button onClick={() => {
            setDailyRecords([]);
            localStorage.removeItem("lastSavedDate"); // Reset button state for a new week
          }}>
            Reset Weekly Data
          </button>
        </>
      )}
    </div>
  );
}
