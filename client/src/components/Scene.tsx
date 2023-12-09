import { FC } from "react";
import { CuboidCollider } from "@react-three/rapier";
import Piece from "./Piece";
import Button from "./Button";
import { Account } from "starknet";

interface SceneProps {
    account: Account,
    setSecret: any,
    spawn: any,

}

const Scene: FC<SceneProps> = ({account, setSecret, spawn}) => {

    return (
        <>
            <CuboidCollider position={[0, -2, 0]} args={[15, .5, 15]} >
                <mesh position={[0,-2,0]}>
                    <boxGeometry args={[30,1,30]}/>
                    <meshBasicMaterial color="purple"/>
                </mesh>
            </CuboidCollider>    

            <Piece coords={[0,0,0]} type={0} />
            <Button coords= {[5,7,5]} click={() => setSecret(account, 250)} label="SetSecret" scale={1.5}/>

            <Button coords= {[5,5,5]} click={() => spawn(account)} label="Spawn" scale={2}/>
        </>
    );
}

export default Scene;