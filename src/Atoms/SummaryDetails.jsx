import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SummaryDetails = ({ details = "Details not provided.", title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container mt-5">
      <h3 className=" text-warning" style={{ color: "rgb(254, 114, 76)" }}>
        {title}
      </h3>
      <div className="card shadow-lg border-light">
        <div className="card-body">
          <p>
            {isExpanded ? details : `${details.slice(0, 200)}...`}
            {!isExpanded && details.length > 200 && (
              <span
                className="cursor-pointer text-warning"
                onClick={toggleExpand}
              >
                {" "}Read More
              </span>
            )}
          </p>
          {isExpanded && (
            <span
              className="text-primary cursor-pointer"
              onClick={toggleExpand}
            >
              {" "}Read Less
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

SummaryDetails.propTypes = {
  details: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SummaryDetails;
