import {useReactFlow} from '@xyflow/react';
import React, {CSSProperties, DragEvent, MouseEvent, useCallback, useRef} from 'react';
import {FaSearch} from 'react-icons/fa';
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

function onClickNoBubble(e: any) {
    e.stopPropagation();
}

function ContextSearchBox() {
    return (
        <>
            <label htmlFor="context-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FaSearch/>
                </div>
                <input type="text" id="context-search"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search node name..." onClick={onClickNoBubble}/>
            </div>
        </>
    );
}

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
             className={'bg-gradient-to-r to-red-700 from-purple-600 via-teal-500 p-[0.1rem] rounded-lg z-50'}
        >
            <div
                className={'shadow-lg rounded-lg p-4 z-50 w-80 flex flex-col items-stretch justify-center border border-gray-200 bg-primary-light dark:bg-primary dark:border-gray-700'}>
                <ContextSearchBox/>
                {/*<p className={'pointer-events-none p-2 text-sm'}>Choose a node.</p>*/}
                <div className={'pt-4 z-50'}>
                    {LevelEditorNodeTypes.map((node: EditorNodeType, i: number) =>
                        <>
                            <div
                                key={crypto.randomUUID()}
                                className={'rounded-lg p-2 cursor-pointer flex justify-between hover:opacity-60 text-xs'}
                                onClick={(e: MouseEvent<any>) => {
                                    e.preventDefault();
                                    createNodeEvent(node.type);
                                }}
                                onDragStart={(event: DragEvent) => onDragStart(event, node.type)}
                                draggable
                            >
                                {node.icon}
                                <p key={crypto.randomUUID()} className={'pr-6'}>{node.type.toReadableString()}</p>
                            </div>
                            {i < LevelEditorNodeTypes.length - 1 &&
                                <hr key={crypto.randomUUID()}
                                    className={'h-px bg-gray-200 border-0 dark:bg-gray-700'}/>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}