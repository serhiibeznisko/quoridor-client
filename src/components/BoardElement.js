import React from "react";
import classNames from "classnames";
import {motion} from "framer-motion";
import style from "./BoardElement.scss";

import {CELL_SIZE} from "../constants/config";

const BoardElement = ({x, y, color, className, children, withAnimation, ...rest}) => {
    x *= CELL_SIZE;
    y *= CELL_SIZE;

    return (
        <motion.div
            className={classNames(style.container, className)}
            style={{
                background: color,
                left: withAnimation ? 0 : x,
                top: withAnimation ? 0 : y,
            }}
            animate={withAnimation ? {x, y} : undefined}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default BoardElement;
