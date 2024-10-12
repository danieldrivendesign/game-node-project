import React from 'react';
import '@xyflow/react/dist/style.css';
import Toaster from "../../Utils/Toaster";
import {Flowbite} from 'flowbite-react';
import LevelFlow from "./LevelFlow";

export default function LevelNodeEditor() {
    return (
        <Flowbite>
            <div className={"w-full h-full"}>
                <Toaster/>
                <div style={{height: "100vh", width: '100vw'}} >
                    <LevelFlow/>
                </div>
            </div>
        </Flowbite>
    );
}

