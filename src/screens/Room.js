import React from "react";
import {withRouter} from "react-router-dom";
import queryString from "query-string";
import uuid4 from "uuid4";
import style from "./Room.scss";

import Board from "../components/Board";
import Player from "../components/Player";
import Wall from "../components/Wall";

import {WIDTH, HEIGHT} from "../constants/config";

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
        this.setWebsocket();
    }

    setWebsocket = () => {
        const socketClient = new WebSocket(
            `ws://localhost:8001/ws/room/room`
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
            data: {...nextPlayer},
        });
    };

    getWalls = (isVertical) => {
        const walls = [];
        const {board} = this.state;

        board[isVertical].forEach((row, y) => row.forEach((color, x) => {
            if(color != null) {
                walls.push(
                    <Wall key={`${y}${x}`} x={x} y={y} isVertical={isVertical} color={color}/>
                );
            }
        }));

        return walls;
    };

    takeWall = (wall) => {
        const {player} = this.state;
        wall.color = wall.color == null ? player.color : null;
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
                <Board
                    board={board}
                    onCellClick={this.onCellClick}
                    takeWall={this.takeWall}
                >
                    {player && <Player {...player}/>}
                    {opponent && <Player {...opponent}/>}

                    {this.getWalls(true)}
                    {this.getWalls(false)}
                </Board>
            </div>
        );
    }
}

export default withRouter(Room);
