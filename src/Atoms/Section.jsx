import PropTypes from 'prop-types';
import  SmallCard  from './SmallCard'; // Assuming SmallCard is in the same directory

const Section = ({ title, details = [], icon }) => {
  return (
    <div className="container mt-5">
      <div className="bg-warning text-white p-3 d-flex align-items-center mb-4">
        <div className="fs-3 me-3">
          {icon}
        </div>
        <h3>{title}</h3>
      </div>

      <div className="row">
        {details.map((detail) => (
          <div key={detail.id || detail.label} className="col-12 col-md-3">
            <SmallCard
              icon={detail.icon}
              label={detail.label}
              value={detail.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  details: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      icon: PropTypes.node,
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  icon: PropTypes.node,
};

export default Section;
