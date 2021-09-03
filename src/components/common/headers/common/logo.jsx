import React from "react";
import { Link } from "react-router-dom";

function LogoImage(props) {
  return (
    <Link to={`/`}>
      <img
        src={`/assets/images/icon/${props.logo}`}
        style={{ height: 80, width: 100 }}
        alt=""
        className="img-fluid"
      />
    </Link>
  );
}

export default LogoImage;
