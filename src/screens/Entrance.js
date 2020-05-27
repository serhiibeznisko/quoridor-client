import React, {useState} from "react";
import classNames from "classnames";
import {Redirect} from "react-router-dom";
import style from "./Entrance.scss";

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
        "#ffe835",
        "#f29203",
        "#f25319",
        "#9e5a31",
        "#532B2A",
        "#732B24",
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
