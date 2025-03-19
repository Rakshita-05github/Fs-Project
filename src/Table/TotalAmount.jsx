import React from 'react';

export default function TotalAmount({ array, columns }) {
    // Check if "Price" column exists and calculate total
    const totalAmount = columns.includes("Price") 
        ? array.reduce((sum, row) => sum + (parseFloat(row.Price) || 0), 0)
        : 0;

    return (
        <div>
            <h3>Total Amount: {totalAmount}</h3>
        </div>
    );
}
