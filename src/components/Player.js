import React from "react";
import style from "./Player.scss";

import BoardElement from "./BoardElement";

const Player = ({x, y, letter, color}) => {
    return (
        <BoardElement x={x} y={y} className={style.container}>
            <div className={style.player} style={{background: color}}>
                <span className={style.player__letter}>{letter}</span>
            </div>
        </BoardElement>
    );
};

export default Player;
