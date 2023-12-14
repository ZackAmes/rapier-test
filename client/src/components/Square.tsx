import {FC} from 'react';
import { CuboidCollider } from '@react-three/rapier';
import Piece from './Piece';
import {Box} from '@react-three/drei';

interface SquareProps {
    coords: number[]
    state: number
}

const Square: FC<SquareProps> = ({coords, state}) => {
    return (
        <>
            <CuboidCollider position={[coords[0], coords[1]-2, coords[2]]} args={[2.5, .5, 2.5]} >
                    <Box args={[5,1,5]}>
                        <meshPhysicalMaterial color= "purple"/>
                    </Box>    
            </CuboidCollider>    
            <Piece coords={coords} type={state}/>
        </>
    )
}

export default Square;