import React, {useState, useRef} from "react";
import style from "./Board.scss";

import Cell from "./Cell";

import {WIDTH, HEIGHT, CELL_SIZE} from "../constants/config";
import Wall from "./Wall";

const Board = ({onCellClick, takeWall, board, children}) => {
    const [wallInput, setWallInput] = useState(null);
    const [cellInput, setCellInput] = useState(null);
    const [isBoardHovered, setIsBoredHovered] = useState(false);
    const centerPoint = useRef(null);

    const canTakeWall = !cellInput;

    const onMouseMove = (e) => {
        if (!canTakeWall) {
            return;
        }

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
            color: null,
        };

        if (wallInput == null || wall.x !== wallInput.x || wall.y !== wallInput.y || wall.isVertical !== wallInput.isVertical) {
            if (isWallTaken(wall)) {
                wall.color = "#df2310";
            }
            setWallInput(wall);
        }
    };

    const onClick = () => {
        if (wallInput && canTakeWall) {
            takeWall(wallInput);
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

    const isWallTaken = (wall) => {
        return board[wall.isVertical][wall.y][wall.x] != null;
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
                    {canTakeWall && wallInput && isBoardHovered && (
                        <Wall {...wallInput} color={wallInput.color || "rgba(124,231,115, 0.9)"}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Board;
