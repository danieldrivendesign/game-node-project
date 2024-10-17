import {ReactFlowProvider} from '@xyflow/react';
import React from 'react';
import '@xyflow/react/dist/style.css';
import ToolMenu from '../../Menus/ToolMenu';
import LevelFlow from '../../NodeEditors/LevelNodeEditor/LevelFlow';

export default function LevelNodeEditor() {
    return (
        <div style={{height: '100vh', width: '100vw'}} className={'flex flex-col'}>
            <ReactFlowProvider>
                <div className={'flex-grow'}>
                    <LevelFlow/>
                </div>
            </ReactFlowProvider>
        </div>
    );
}

