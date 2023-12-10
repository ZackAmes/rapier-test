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
        let drawY = coords[1] + (Math.floor(index/3)) * 5
        return(
            <Square coords={[drawX, drawY, coords[2]]} state={square}/>
        )

    });

    return(
        <>
            {squares}
        </>
    )
}

export default Board;