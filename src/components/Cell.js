import React from "react";
import classNames from "classnames";
import style from "./Cell.scss";

import BoardElement from "./BoardElement";

const Cell = ({x, y, isHovered, onClick, onMouseEnter, onMouseLeave}) => {
    return (
        <BoardElement
            x={x} y={y}
            className={classNames({
                [style.cell]: true,
                [style.cell__hover]: isHovered,
            })}
            onClick={onClick}
        >
            <div
                className={style.cell__inner}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </BoardElement>
    );
};

export default Cell;
