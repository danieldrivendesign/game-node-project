import {useReactFlow} from '@xyflow/react';
import {CSSProperties, DragEvent, useCallback, useRef} from 'react';
import {createNode} from '../Helpers/Helpers';
import {EditorNodeType, LevelEditorNodeTypes} from '../NodeEditors/LevelNodeEditor/Nodes/LevelEditorNodeTypes';

export type ContextModalData = {
    top?: number,
    left?: number
};

const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
};

export function ContextModal({top, left}: ContextModalData) {
    const {getNode, addNodes, screenToFlowPosition} = useReactFlow();
    const ref = useRef<HTMLDivElement>(null);

    const styles = {
        top: top ?? 0,
        left: left ?? 0,
        transform: 'translate(0%, -50%)',
        position: 'absolute'
    } as CSSProperties;

    const createNodeEvent = useCallback((nodeType: string) => {
        const position = screenToFlowPosition({
            x: left ?? 0,
            y: top ?? 0
        });
        const newNode = createNode({nodeType, position});
        if (newNode === null) {
            return;
        }
        addNodes(newNode);
    }, [getNode, addNodes]);

    return (
        <div style={styles} ref={ref}
             className={'bg-gradient-to-r to-red-700 from-purple-600 via-teal-500 p-[0.2rem] rounded-lg z-50'}
        >
            <div className={'shadow-lg rounded-lg p-4 z-50 w-80 flex flex-col items-stretch justify-center border border-gray-200 bg-primary-light dark:bg-primary dark:border-gray-700'}>
                <p className={'pointer-events-none p-2 text-sm'}>Choose a node.</p>
                {LevelEditorNodeTypes.map((node: EditorNodeType, i: number) =>
                    <>
                        <div
                            key={crypto.randomUUID()}
                            className={'rounded-lg p-2 cursor-pointer flex justify-between hover:opacity-60'}
                            onClick={() => createNodeEvent(node.type)}
                            onDragStart={(event: DragEvent) => onDragStart(event, node.type)}
                            draggable
                        >
                            {node.icon}
                            <p key={crypto.randomUUID()} className={'pr-6'}>{node.type.toReadableString()}</p>
                        </div>
                        {i < LevelEditorNodeTypes.length - 1 &&
                            <hr key={crypto.randomUUID()} className={'h-px bg-gray-200 border-0 dark:bg-gray-700'}/>}
                    </>
                )}
            </div>
        </div>
    );
}