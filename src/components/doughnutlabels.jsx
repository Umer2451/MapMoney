import React from 'react';
import PropTypes from 'prop-types';
import "../styles/doughnutlabels.css";

function DoughnutLabels({ color, icon, title, percentage }) {
  return (
    <div className="doughnut-labels">
      <div className="iconsDiv" style={{ backgroundColor: color }}>
        <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>{icon}</span>
      </div>
      <div className="textDiv">
        <p className="sort-text">{title}</p>
        <div className="sort-percentage">
          <p>{percentage} %</p>
        </div>
      </div>
    </div>
  );
}

DoughnutLabels.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default DoughnutLabels;
