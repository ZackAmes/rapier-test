import { useComponentValue} from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useDojo } from "./DojoContext";
import { Suspense } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";

import { Canvas } from "@react-three/fiber";
import { Physics} from "@react-three/rapier";

import Burners from "./components/Burners";
import AccRender from "./components/AccRender";
import Scene from "./components/Scene";
function App() {
    const {
        setup: {
            systemCalls: { spawn, setSecret},
            components: { Secret, Piece, Player, Game, Square },
            network
        },
        account: {
            create,
            list,
            select,
            account,
            isDeploying,
            clear,
        },
    } = useDojo();

    // entity id we are syncing
    const entityId = getEntityIdFromKeys([BigInt(account.address)]) as Entity;

    // get current component values
    const secret = useComponentValue(Secret, entityId);

    // sync from remote torii
    //useSync(torii_client, SecretContract, [BigInt(account.address)]);

    return(
        <>
        <Canvas style={{height:800, width:800}}camera={{rotation:[0,0,0], position:[0,10,30] }}>
            <Suspense>
            <Physics debug gravity={[0,-10,0]}>
                <Scene account={account} setSecret={setSecret} spawn={spawn}/>
                
                <Burners coords={[0,15,20]} create={create} list={list} select={select} clear={clear}/>
                
                <AccRender coords={[-10, 15,15]} account={account} click={() => console.log(account.address)}/>

            </Physics>
            </Suspense>
        </Canvas>
        </>
    );
}

export default App;
