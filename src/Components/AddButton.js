import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  render() {
    const { label, onClick, className, targetUrl, isDisabled } = this.props;
    let style;
    if (this.state.isHovering) {
      style = {
        backgroundColor: "#037EAE",
        color: "white",
        borderRadius: "7px",
        fontSize: "14px",
        cursor: isDisabled ? "not-allowed" : "pointer"
      };
    } else {
      style = {
        backgroundColor: "#009DDA",
        color: "white",
        borderRadius: "7px",
        fontSize: "14px",
        cursor: isDisabled ? "not-allowed" : "pointer"
      };
    }

    return targetUrl ? (
      <Link
        to={targetUrl}
        className={`${className} h6-5-important`}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        style={style}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faPlus} style={{ fontSize: "12px" }} />

        <span className="font-weight-bold" style={{ marginLeft: "8px" }}>
          {label}
        </span>
      </Link>
    ) : (
      <Button
        type={"button"}
        className={`${className} ${isDisabled ? "disabled" : ""}`}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        style={style}
        onClick={onClick}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ fontSize: "12px", marginBottom: "2px" }}
        />

        <span style={{ marginLeft: "8px" }}>{label}</span>
      </Button>
    );
  }
}

AddButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  targetUrl: PropTypes.string
};

export default AddButton;
