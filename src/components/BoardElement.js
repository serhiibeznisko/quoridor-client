import React from "react";
import classNames from "classnames";
import style from "./BoardElement.scss";

import {CELL_SIZE} from "../constants/config";

const BoardElement = ({x, y, color, className, children, ...rest}) => {
    return (
        <div
            className={classNames(style.container, className)}
            style={{
                background: color,
                left: x * CELL_SIZE,
                top: y * CELL_SIZE,
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default BoardElement;
