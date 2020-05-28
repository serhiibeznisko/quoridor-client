import React from "react";
import {withRouter} from "react-router-dom";
import queryString from "query-string";
import uuid4 from "uuid4";
import style from "./Room.scss";

import Board from "../components/Board";
import Button from "../components/Button";

import {WIDTH, HEIGHT} from "../constants/config";
import PlayerCard from "../components/PlayerCard";

class Room extends React.Component {
    constructor(props) {
        super(props);
        const parsed = queryString.parse(location.search);
        this.state = {
            player: {
                id: uuid4(),
                x: 4,
                y: 0,
                name: parsed.name,
                color: `#${parsed.color}`,
            },
            opponent: null,
            board: {
                [false]: Array(HEIGHT).fill(null).map(() => (Array(WIDTH).fill(null))),
                [true]: Array(HEIGHT).fill(null).map(() => (Array(WIDTH).fill(null))),
            },
        };
    }

    componentDidMount() {
        this.setWebSocket();
    }

    setWebSocket = () => {
        const socketClient = new WebSocket(
            process.env.WS_URL + `room/room`
        );
        const onSocketEvent = this.onSocketEvent;

        socketClient.onmessage = function(e) {
            onSocketEvent(JSON.parse(e.data));
        };

        socketClient.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        socketClient.sendJson = (data) => {
            return socketClient.send(JSON.stringify(data));
        };

        socketClient.onopen = () => {
            const {player} = this.state;
            this.client.sendJson({
                type: "player",
                data: player,
            });
        };

        this.client = socketClient;
    };

    onSocketEvent = (e) => {
        if(e.type === "player") {
            this.updatePlayer(e.data);
        } else if(e.type === "wall") {
            this.setWall(e.data);
        }
    };

    updatePlayer = (data) => {
        const {player} = this.state;
        if(data.id !== player.id) {
            this.setState({
                opponent: data,
            });
        }
    };

    onCellClick = (y, x) => {
        const {player} = this.state;
        const nextPlayer = {...player, y, x};
        this.setState({player: nextPlayer});
        this.client.sendJson({
            type: "player",
            data: nextPlayer,
        });
    };

    onWallSubmit = (wall) => {
        this.setWall(wall);
        this.client.sendJson({
            type: "wall",
            data: wall,
        });
    };

    setWall = (wall) => {
        const nextBoard = {...this.state.board};
        const row = nextBoard[wall.isVertical][wall.y];
        row[wall.x] = wall.color;
        this.setState({
            board: nextBoard,
        });
    };

    render() {
        const {board, player, opponent} = this.state;

        return (
            <div className={style.container}>
                <div className={style.status}>
                    Ожидание хода оппонента...
                </div>
                <div className={style.content}>
                    {player && (
                        <PlayerCard
                            player={player}
                            number={1}
                            actions={(
                                <>
                                    <Button label={"Отменить Ход"}/>
                                    <Button label={"Очистить поле"}/>
                                </>
                            )}
                        />
                    )}
                    <Board
                        board={board}
                        player={player}
                        opponent={opponent}
                        onCellClick={this.onCellClick}
                        onWallSubmit={this.onWallSubmit}
                    />
                    {opponent && (
                        <PlayerCard player={opponent} number={2}/>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Room);
