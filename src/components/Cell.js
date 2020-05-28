import React from "react";
import classNames from "classnames";
import style from "./Cell.scss";
import {CELL_SIZE} from "../constants/config";

const Cell = ({x, y, isHovered, onClick, onMouseEnter, onMouseLeave}) => {
    x *= CELL_SIZE;
    y *= CELL_SIZE;

    return (
        <div
            // whileHover={{scale: 1.1}}
            // whileTap={{ scale: 0.9 }}
            // animate={{
            //     y: 0,
            //     opacity: 1,
            //     transition: {
            //         y: { stiffness: 1000, velocity: -100 }
            //     }
            // }}
            className={classNames({
                [style.cell]: true,
                [style.cell__hover]: isHovered,
            })}
            style={{left: x, top: y}}
            onClick={onClick}
        >
            <div
                className={style.cell__inner}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </div>
    );
};

export default Cell;
