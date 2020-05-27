import React, {useState} from "react";
import classNames from "classnames";
import {Redirect} from "react-router-dom";
import style from "./Entrance.scss";

import Icon from "../components/Icon";

const Entrance = () => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [nameSubmitted, setNameSubmitted] = useState(false);

    const onNameSubmit = (e) => {
        e.preventDefault();
        setNameSubmitted(true);
    };

    const onColorSubmit = (color) => {
        setColor(color);
    };

    if(name && color) {
        return <Redirect to={`/room?name=${name}&color=${color.slice(1)}`}/>
    }

    const colors = [
        "#ed973c",
        "#c700f3",
        "#00f38d",
        "#f25319",
        "#4C2928",
        "#0292f3",
    ];

    return (
        <div className={style.container}>
            {!nameSubmitted ? (
                    <form onSubmit={onNameSubmit} className={style.name}>
                        <input
                            type="text"
                            placeholder={"Меня зовут..."}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className={style.name__input}
                            required
                            autoFocus
                        />
                        <button
                            type={"submit"}
                            className={classNames({
                                [style.name__submit]: true,
                                [style.name__submit__active]: !!name,
                            })}>
                            Выбрать
                        </button>
                    </form>
            ) : (
                <div className={style.color}>
                    <div className={style.color__back} onClick={() => setNameSubmitted(false)}>
                        <Icon name={"angle-left"} fontSize={16}/>
                        Назад
                    </div>
                    <div className={style.color__title}>
                        Цвет моей фишки...
                    </div>
                    <div className={style.color__row}>
                        {colors.map((color, key) => (
                            <div
                                key={key}
                                className={style.color__cell}
                                onClick={() => onColorSubmit(color)}
                                style={{background: color}}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Entrance;
