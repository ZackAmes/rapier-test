import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useDojo } from "./DojoContext";
import { getEntityIdFromKeys } from "@dojoengine/utils";


import Burners from "./components/Burners";
import AccRender from "./components/AccRender";
import Scene from "./components/Scene";

function App() {
    const {
        setup: {
            systemCalls: { spawn, set_secret },
            components: { Secret },
        },
        account: {
            create,
            list,
            select,
            account,
            isDeploying,
            clear,
            copyToClipboard,
            applyFromClipboard,
        },
    } = useDojo();

    // entity id we are syncing
    const entityId = getEntityIdFromKeys([BigInt(account.address)]) as Entity;

    // get current component values
    const secret = useComponentValue(Secret, entityId);

    

    return (
        <>
            <Scene account={account} set_secret={set_secret} spawn={spawn} value={secret ? secret.value : 0}/>

        
                
            <Burners coords={[0,15,20]} create={create} list={list} select={select} clear={clear}/>
                
            <AccRender coords={[-10, 15,15]} account={account} click={() => console.log(account.address)}/>

        </>
    );
}

export default App;
