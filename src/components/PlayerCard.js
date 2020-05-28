import React from "react";
import style from "./PlayerCard.scss";


const PlayerCard = ({player, number, actions}) => {
    return (
        <div className={style.player}>
            <div className={style.player__name}>
                Игрок {number}:
                <span style={{background: player.color}}>{player.name}</span>
            </div>
            <div className={style.player__walls}>
                Осталось 5 перегородок
            </div>
            <div className={style.player__actions}>
                {actions}
            </div>
        </div>
    );
};

export default PlayerCard;
