import { useComponentValue, useSync } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import { useDojo } from "./DojoContext";
import { Suspense } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";

import { Box, Torus } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

import Button from "./components/Button";
import Burners from "./components/Burners";
import AccRender from "./components/AccRender";
function App() {
    const {
        setup: {
            systemCalls: { spawn, setSecret},
            components: { Secret },
            network: {
                contractComponents: {
                    Secret: SecretContract
                },
                torii_client,
            },
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

    const [clipboardStatus, setClipboardStatus] = useState({
        message: "",
        isError: false,
    });

    // entity id we are syncing
    const entityId = getEntityIdFromKeys([BigInt(account.address)]) as Entity;

    // get current component values
    const secret = useComponentValue(Secret, entityId);

    // sync from remote torii
    useSync(torii_client, SecretContract, [BigInt(account.address)]);

    const handleRestoreBurners = async () => {
        try {
            await applyFromClipboard();
            setClipboardStatus({
                message: "Burners restored successfully!",
                isError: false,
            });
        } catch (error) {
            setClipboardStatus({
                message: `Failed to restore burners from clipboard`,
                isError: true,
            });
        }
    };

    useEffect(() => {
        // Clear message after 3 seconds
        if (clipboardStatus.message) {
            const timer = setTimeout(() => {
                setClipboardStatus({ message: "", isError: false });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [clipboardStatus.message]);

    console.log(secret?.value);
    return (
        <>
        <div>
        <button onClick={create}>
            {isDeploying ? "deploying burner" : "create burner"}
        </button>
        {list().length > 0 && (
            <button onClick={async () => await copyToClipboard()}>
                Save Burners to Clipboard
            </button>
        )}
        <button onClick={handleRestoreBurners}>
            Restore Burners from Clipboard
        </button>
        {clipboardStatus.message && (
            <div className={clipboardStatus.isError ? "error" : "success"}>
                {clipboardStatus.message}
            </div>
        )}

        <div className="card">
            select signer:{" "}
            <select
                value={account ? account.address : ""}
                onChange={(e) => select(e.target.value)}
            >
                {list().map((account, index) => {
                    return (
                        <option value={account.address} key={index}>
                            {account.address}
                        </option>
                    );
                })}
            </select>
            <div>
                <button onClick={() => clear()}>Clear burners</button>
            </div>
        </div>
        </div>
        <Canvas style={{height:800, width:800}}camera={{rotation:[0,0,0], position:[0,5,15] }}>
            <Suspense>
            <Physics debug gravity={[0,-10,0]}>
                <RigidBody position={[-2,0,0]} colliders={"hull"} restitution={1.5}>
                    <mesh onClick={() => setSecret(account, 200)}>
                        <cylinderGeometry/>
                        <meshBasicMaterial color = {"rgb(0, " + secret?.value +",0)"}/>
                    </mesh>
                </RigidBody>

                <RigidBody position={[10,0,0]} colliders={"cuboid"} restitution={0}>
                    <mesh onClick={() => spawn(account)}>
                        <boxGeometry/>
                        <meshBasicMaterial color="black"/>
                    </mesh>
                </RigidBody>
                <axesHelper/>
                <Button coords= {[5,7,5]} click={() => setSecret(account, 250)} label="SetSecret" scale={1.5}/>

                <Button coords= {[5,5,5]} click={() => spawn(account)} label="Spawn" scale={2}/>
                <Burners coords={[-1,5,0]} create={create} list={list} select={select} clear={clear}/>
                <CuboidCollider position={[0, -2, 0]} args={[15, .5, 15]} >
                    <mesh position={[0,-2,0]}>
                        <boxGeometry args={[30,1,30]}/>
                        <meshBasicMaterial color="purple"/>
                    </mesh>
                </CuboidCollider>    
                <AccRender coords={[-1, 8,0]} account={account} click={() => console.log("clicked")}/>
            </Physics>
            </Suspense>
        </Canvas>
        </>
    );
}

export default App;
