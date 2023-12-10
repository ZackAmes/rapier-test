import { FC } from "react";
import { CuboidCollider } from "@react-three/rapier";
import Piece from "./Piece";
import Button from "./Button";
import { Account } from "starknet";
import Board from "./Board";

interface SceneProps {
    account: Account,
    setSecret: any,
    spawn: any,

}

const Scene: FC<SceneProps> = ({account, setSecret, spawn}) => {

    return (
        <>
            
            <Board coords={[0,0,0]}/>
            <Piece coords={[0,5,5]} type={1} />
            <Button coords= {[5,7,5]} click={() => setSecret(account, 250)} label="SetSecret" scale={1.5}/>

            <Button coords= {[5,5,5]} click={() => spawn(account)} label="Spawn" scale={2}/>
        </>
    );
}

export default Scene;