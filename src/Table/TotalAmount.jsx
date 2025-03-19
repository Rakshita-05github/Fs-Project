import React, { useEffect, useState } from 'react';

export default function TotalAmount({ array, columns }) {
    const [dailyTotal, setDailyTotal] = useState(0);
    const [weeklyTotals, setWeeklyTotals] = useState([]);
    const [dailyRecords, setDailyRecords] = useState([]);

    useEffect(() => {
        if (columns.includes("Price")) {
            const total = array.reduce((sum, row) => sum + (parseFloat(row.Price) || 0), 0);
            setDailyTotal(total);
        }
    }, [array, columns]);

    // Function to save the daily total with the current date
    function saveDailyTotal() {
        const today = new Date().toLocaleDateString(); // Get current date (e.g., "3/19/2025")
        
        if (dailyRecords.length < 7) {
            setDailyRecords([...dailyRecords, { date: today, total: dailyTotal }]);
        } else {
            alert("7 days completed! Weekly total is now calculated.");
        }

        setDailyTotal(0); // Reset daily total for the next day
    }

    // Calculate total for the week when 7 days of data are stored
    const weeklyTotal = dailyRecords.length === 7 
        ? dailyRecords.reduce((sum, record) => sum + record.total, 0) 
        : 0;

    return (
        <div>
            <h3>Today's Total: {dailyTotal}</h3>
            <button onClick={saveDailyTotal} disabled={dailyRecords.length === 7}>Save Daily Total</button>

            <h3>Daily Records:</h3>
            <ul>
                {dailyRecords.map((record, index) => (
                    <li key={index}>{record.date}: {record.total}</li>
                ))}
            </ul>

            {dailyRecords.length === 7 && (
                <>
                    <h3>Weekly Total: {weeklyTotal}</h3>
                    <button onClick={() => setDailyRecords([])}>Reset Weekly Data</button>
                </>
            )}
        </div>
    );
}
