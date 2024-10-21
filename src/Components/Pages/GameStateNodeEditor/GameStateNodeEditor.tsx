import {ReactFlowProvider} from '@xyflow/react';
import React, {useEffect} from 'react';
import FlowRenderer from '../../NodeEditors/Flows/FlowRenderer';
import {LevelEditorNodeTypes} from '../../NodeEditors/LevelNodeEditor/Nodes/LevelEditorNodeTypes';

export default function GameStateNodeEditor() {

    useEffect(() => {
        document.title = 'Game State Editor';
    }, []);

    return (
        <div style={{height: '100vh', width: '100vw'}} className={'flex flex-col'}>
            <ReactFlowProvider>
                <div className={'flex-grow'}>
                    <FlowRenderer nodeTypes={LevelEditorNodeTypes}/>
                </div>
            </ReactFlowProvider>
        </div>
    );
}