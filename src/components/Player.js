import React from "react";
import style from "./Player.scss";

import BoardElement from "./BoardElement";

const Player = ({x, y, letter, color}) => {

    function shadeColor(color, percent) {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R<255)?R:255;
        G = (G<255)?G:255;
        B = (B<255)?B:255;

        var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

        return "#"+RR+GG+BB;
    }

    return (
        <BoardElement x={x} y={y} className={style.container}>
            <div
                className={style.player}
                style={{
                    background: `linear-gradient(40deg, ${color} 40%, ${shadeColor(color, 30)} 100%)`
                }}
            >
                <span className={style.player__letter}>{letter}</span>
            </div>
        </BoardElement>
    );
};

export default Player;
