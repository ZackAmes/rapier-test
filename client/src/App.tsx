import { useComponentValue, useSync } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import { useDojo } from "./DojoContext";
import { Suspense } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";

import { Box, Torus } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

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
        <Canvas camera={{rotation:[-Math.PI/3,0,0], position:[0,10,5] }}>
            <Suspense>
            <Physics debug>
                <RigidBody colliders={"hull"} restitution={2}>
                    <Torus onClick={() => setSecret(account, 200)}/>
                    <meshBasicMaterial color = {"rgb(0, " + secret?.value +",0)"}/>
                </RigidBody>

                <RigidBody colliders={"cuboid"} restitution={0}>
                    <Box scale = {5} position = {[10,0,0]} onClick={() => spawn(account)}/>
                    <meshBasicMaterial color="black"/>
                </RigidBody>

                <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
            </Physics>
            </Suspense>
        </Canvas>
    );
}

export default App;
