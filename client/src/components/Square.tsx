import {FC} from 'react';
import { CuboidCollider } from '@react-three/rapier';
import Piece from './Piece';

interface SquareProps {
    coords: number[]
    state: number
}

const Square: FC<SquareProps> = ({coords, state}) => {
    return (
        <>
            <CuboidCollider position={[coords[0], coords[1]-2, coords[2]]} args={[2.5, .5, 2.5]} >
                    <mesh >
                        <boxGeometry args={[2.5,.5,2.5]}/>
                        <meshBasicMaterial color="purple"/>
                    </mesh>
            </CuboidCollider>    
            <Piece coords={coords} type={state}/>
        </>
    )
}

export default Square;