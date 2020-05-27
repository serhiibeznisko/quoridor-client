import React from "react";
import classNames from "classnames";
import style from "./Wall.scss";

import BoardElement from "./BoardElement";


const Wall = ({x, y, isVertical, color}) => {
    return (
        <BoardElement
            x={x} y={y} color={color}
            className={classNames({
                [style.wall]: true,
                [style.wall__vertical]: isVertical,
                [style.wall__horizontal]: !isVertical,
            })}
        >
            <div
                className={classNames({
                    [style.wall__vertical__inner]: isVertical,
                    [style.wall__horizontal__inner]: !isVertical,
                })}
            />
        </BoardElement>
    );
};

export default Wall;
