import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { setup } from "./dojo/setup";
import { DojoProvider } from "./DojoContext";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

async function init() {
    const rootElement = document.getElementById("root");
    if (!rootElement) throw new Error("React root not found");
    const root = ReactDOM.createRoot(rootElement as HTMLElement);

    const setupResult = await setup();
    root.render(
        <React.StrictMode>
            <DojoProvider value={setupResult}>
                <Canvas style={{height:800, width:800}}camera={{rotation:[0,0,0], position:[0,10,30] }}>
                    <Suspense>
                    <Physics>
                        <App/>
                    </Physics>
                    </Suspense>
                </Canvas>
            </DojoProvider>
        </React.StrictMode>
    );
}

init();
