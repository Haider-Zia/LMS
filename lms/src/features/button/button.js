import React from "react";
import PropTypes from "prop-types";

function Button({ color, text, onClick }) {
  return (
    <div>
      <button
        type="button"
        className="btn"
        style={{ background: color }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: "black",
  text: "Button",
};
