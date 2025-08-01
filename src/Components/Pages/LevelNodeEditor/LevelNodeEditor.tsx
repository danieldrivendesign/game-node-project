import {ReactFlowProvider} from '@xyflow/react';
import React, {useEffect} from 'react';
import '@xyflow/react/dist/style.css';
import FlowRenderer from '../../NodeEditors/Flows/FlowRenderer';
import {LevelEditorNodeTypes} from '../../NodeEditors/LevelNodeEditor/Nodes/LevelEditorNodeTypes';

export default function LevelNodeEditor() {
    useEffect(() => {
        document.title = 'Level Node Editor';
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

