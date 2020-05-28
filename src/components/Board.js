import React, {useState, useRef} from "react";
import style from "./Board.scss";

import Cell from "./Cell";

import {WIDTH, HEIGHT, CELL_SIZE} from "../constants/config";
import Wall from "./Wall";
import Player from "./Player";

const Board = ({onCellClick, onWallSubmit, board, player, opponent, children}) => {
    const [wallInput, setWallInput] = useState(null);
    const [cellInput, setCellInput] = useState(null);
    const [isBoardHovered, setIsBoredHovered] = useState(false);
    const centerPoint = useRef(null);

    const showWallInput = !cellInput;

    const onMouseMove = (e) => {
        if (!showWallInput) return;

        const center = centerPoint.current.getBoundingClientRect();
        const mouseX = e.clientX - center.x;
        const mouseY = e.clientY - center.y;
        const cellRawX = Math.round(mouseX / CELL_SIZE);
        const cellRawY = Math.round(mouseY / CELL_SIZE);
        const cellX = Math.min(WIDTH - 1, Math.max(cellRawX, 1));
        const cellY = Math.min(HEIGHT - 1, Math.max(cellRawY, 1));
        const relativeMouseX = mouseX - cellX * CELL_SIZE;
        const relativeMouseY = mouseY - cellY * CELL_SIZE;
        const isVertical = Math.abs(relativeMouseX) < Math.abs(relativeMouseY);

        const wall = {
            x: !isVertical ? cellX - 1 : cellX,
            y: isVertical ? cellY - 1 : cellY,
            isVertical,
        };

        if (wallInput == null || wall.x !== wallInput.x || wall.y !== wallInput.y || wall.isVertical !== wallInput.isVertical) {
            if (isWallTaken(wall)) {
                wall.color = "#df2b32";
            } else {
                wall.color = "rgba(218,213,213,0.4)";
            }
            setWallInput(wall);
        }
    };

    const onClick = () => {
        if (wallInput && showWallInput && (canTakeWall(wallInput) || isWallTaken(wallInput))) {
            if(isWallTaken(wallInput)) {
                wallInput.color = null;
            } else {
                wallInput.color = player.color;
            }
            onWallSubmit(wallInput);
        }
    };

    const onCellMouseEnter = (y, x) => {
        setCellInput({y, x});
    };

    const onCellMouseLeave = () => {
        setCellInput(null);
    };

    const onCellSubmit = () => {
        onCellClick(cellInput.y, cellInput.x);
        setCellInput(null);
    };

    const canTakeWall = (wall) => {
        const crossWall = {...wall};
        if(wall.isVertical) {
            crossWall.x--;
            crossWall.y++;
        } else {
            crossWall.x++;
            crossWall.y--;
        }
        crossWall.isVertical = !wall.isVertical;
        return !isWallTaken(crossWall);
    };

    const isWallTaken = (wall) => {
        return board[wall.isVertical][wall.y][wall.x] != null;
    };

    const getWalls = (isVertical) => {
        const walls = [];
        board[isVertical].forEach((row, y) => row.forEach((color, x) => {
            if(color != null) {
                walls.push(
                    <Wall key={`${y}${x}`} x={x} y={y} isVertical={isVertical} color={color}/>
                );
            }
        }));
        return walls;
    };

    return (
        <div
            className={style.container}
            onClick={onClick}
            onMouseMove={onMouseMove}
            onMouseEnter={() => setIsBoredHovered(true)}
            onMouseLeave={() => setIsBoredHovered(false)}
        >
            <div className={style.board}>
                <div className={style.board__center} ref={centerPoint}/>
                <div>
                    {Array(HEIGHT).fill(null).map((_, y) => (
                        Array(WIDTH).fill(null).map((_, x) => (
                            <Cell
                                key={`${y}${x}`}
                                x={x} y={y}
                                onMouseEnter={() => onCellMouseEnter(y, x)}
                                onMouseLeave={onCellMouseLeave}
                            />
                        ))
                    ))}
                    {cellInput && (
                        <Cell
                            x={cellInput.x}
                            y={cellInput.y}
                            onClick={onCellSubmit}
                            onMouseEnter={() => onCellMouseEnter(cellInput.y, cellInput.x)}
                            onMouseLeave={onCellMouseLeave}
                            isHovered
                        />
                    )}
                </div>
                <div>
                    {children}
                    {player && <Player {...player}/>}
                    {opponent && <Player {...opponent}/>}
                    {getWalls(true)}
                    {getWalls(false)}
                    {showWallInput && wallInput && isBoardHovered && (
                        <Wall {...wallInput} color={wallInput.color}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Board;
