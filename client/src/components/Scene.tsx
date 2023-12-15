import { FC } from "react";
import Piece from "./Piece";
import Button from "./Button";
import { Account } from "starknet";
import Board from "./Board";

interface SceneProps {
    account: Account,
    value:any,
    set_secret: any,
    spawn: any,

}

const Scene: FC<SceneProps> = ({account, value, set_secret, spawn}) => {

    return (
        <>
            
            <Board coords={[0,0,0]}/>
            <Piece coords={[0,5,5]} type={1} />
            <Button coords= {[5,7,5]} click={() => set_secret(account, 250)} label="Set Secret" scale={1.5}/>

            <Button color = {"rgb(0," + value%255 +",0)"} coords= {[5,5,5]} click={() => spawn(account)} label="Spawn" scale={2}/>
        </>
    );
}

export default Scene;