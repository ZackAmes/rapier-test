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
            <CuboidCollider position={[coords[0], coords[1]-2, coords[2]]} args={[15, .5, 15]} >
                    <mesh >
                        <boxGeometry/>
                        <meshBasicMaterial color="purple"/>
                    </mesh>
            </CuboidCollider>    
            <Piece coords={coords} type={state}/>
        </>
    )
}

export default Square;