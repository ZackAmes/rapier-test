import { FC } from "react";
import Square from "./Square";

interface BoardProps {
    coords: number[]
    squareStates?: any[]
}

let defaultState = [[0,0,0],[0,0,0],[0,0,0]];
const Board: FC<BoardProps> = ({coords, squareStates=defaultState}) => {

    let squares = squareStates.flat().map( (square, index) => {

        let drawX = coords[0] + (index % 3) * 5
        let drawZ = coords[2] + (Math.floor(index/3)) * 5
        return(
            <Square key={index} coords={[drawX, coords[1], drawZ]} state={square}/>
        )

    });

    return(
        <>
            {squares}
        </>
    )
}

export default Board;