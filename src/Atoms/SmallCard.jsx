import React from 'react';

// Assuming you have these colors defined elsewhere in your app
const colors = {
  DarkGrey: '#6c757d', // Example dark grey color
};

const SmallCard = ({ label, value }) => {
  return (
    <div className="card m-2 p-2">
      <div className="d-flex justify-content-between">
        <p className="card-title font-weight-bold text-muted" style={{ fontSize: '16px' }}>
          {label}
        </p>
        <p className="card-text" style={{ fontSize: '18px' }}>
          : {value}
        </p>
      </div>
    </div>
  );
};

export default SmallCard;
