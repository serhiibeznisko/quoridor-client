import React from "react";
import classNames from "classnames";
import style from "./Wall.scss";

import {CELL_SIZE} from "../constants/config";


const Wall = ({x, y, isVertical, color}) => {
    x *= CELL_SIZE;
    y *= CELL_SIZE;

    return (
        <div
            className={classNames({
                [style.wall]: true,
                [style.wall__vertical]: isVertical,
                [style.wall__horizontal]: !isVertical,
            })}
            style={{background: color, left: x, top: y}}
        >
            <div
                className={classNames({
                    [style.wall__vertical__inner]: isVertical,
                    [style.wall__horizontal__inner]: !isVertical,
                })}
            />
        </div>
    );
};

export default Wall;
