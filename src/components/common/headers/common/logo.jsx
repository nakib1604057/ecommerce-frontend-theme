import React from "react";
import { Link } from "react-router-dom";

function LogoImage(props) {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/icon/${props.logo}`}
        style={{ height: 80, width: 100 }}
        alt=""
        className="img-fluid"
      />
    </Link>
  );
}

export default LogoImage;
