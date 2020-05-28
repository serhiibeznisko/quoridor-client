import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import style from "./Button.scss";

import Icon from "./Icon";

const Button = ({label, to, type, level, onClick, className, disabled, icon}) => {
    const levelClass = `button__${level}`;
    const classes = classNames({
        [style.button]: true,
        [style[levelClass]]: level != null,
        [className]: className != null,
    });

    let body = (
        <>
            {label}
            {icon != null && <>&nbsp; <Icon name={icon} /></>}
        </>
    );

    let button = (
        <button type={type} onClick={onClick} className={classes} disabled={disabled}>
            {body}
        </button>
    );

    if(to != null) {
        button = (
            <Link to={to} onClick={onClick} className={classes}>
                {body}
            </Link>
        );
    }

    return button;
};

export default Button;
