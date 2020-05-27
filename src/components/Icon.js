import React from "react";
import classNames from "classnames";
import {Link} from "react-router-dom";

export default ({name, title, to, onClick, fontSize, className}) => {
    const icon =  (
        <i
            className={classNames(`las la-${name}`, className)}
            onClick={onClick}
            style={{fontSize}}
            title={title}
        />
    );

    return (
        to == null ? icon : <Link to={to} style={{color: "inherit"}}>{icon}</Link>
    )
}
