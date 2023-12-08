import { useComponentValue, useSync } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import "./App.css";
import { useDojo } from "./DojoContext";
import { Direction } from "./utils";
import { Suspense } from "react";

import { Box, Torus } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

function App() {
    const {
        setup: {
            systemCalls,
            components: { Moves, Position },
            network: {
                contractComponents: {
                    Moves: MovesContract,
                    Position: PositionContract,
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
    const entityId = account.address.toString() as Entity;

    // get current component values
    const position = useComponentValue(Position, entityId);
    const moves = useComponentValue(Moves, entityId);

    // sync from remote torii
    useSync(torii_client, MovesContract, [entityId]);
    useSync(torii_client, PositionContract, [entityId]);

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

    return (
        <Canvas>
            <Suspense>
            <Physics debug>
                <RigidBody colliders={"hull"} restitution={2}>
                <Torus />
                </RigidBody>
    
                <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
            </Physics>
            </Suspense>
        </Canvas>
    );
}

export default App;
