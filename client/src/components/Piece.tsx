import { RigidBody } from '@react-three/rapier';
import {FC} from 'react';

interface PieceProps {
    coords: number[];
    type: number;
}

const getColor= (type:number) => {
    return "rgb(" + type * 18473 % 255 + "0,0)" 
}

const Piece: FC<PieceProps> = ({coords, type}) =>  {
    return(
        <RigidBody restitution={1.75} mass={5} colliders={"hull"} position={[coords[0], coords[1], coords[2]]}>
            <mesh>
                <cylinderGeometry />
                <meshBasicMaterial color={getColor(type)}/>
            </mesh>
        </RigidBody>
    )    
}

export default Piece;