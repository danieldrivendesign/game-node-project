import {useReactFlow} from '@xyflow/react';
import {CSSProperties, DragEvent, useCallback, useRef} from 'react';
import {BsFillNodePlusFill} from 'react-icons/bs';
import {createId} from '../Helpers/Helpers';
import {AppNode, nodeTypes} from '../Nodes';

export type ContextModalData = {
    top?: number,
    left?: number
};

const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
};

export function ContextModal({top, left}: ContextModalData) {
    const nTypes = nodeTypes;
    const {getNode, setNodes, addNodes, setEdges, screenToFlowPosition} = useReactFlow();
    const ref = useRef<HTMLDivElement>(null);

    const styles = {
        top: top ?? 0,
        left: left ?? 0,
        transform: 'translate(0%, -50%)',
        position: 'absolute'
    } as CSSProperties;

    const createNode = useCallback((nodeType: string) => {
        const id: string = createId();

        const position = screenToFlowPosition({
            x: left ?? 0,
            y: top ?? 0
        });

        const newNode = {
            id: id,
            position: position,
            type: 'levelNode',
            data: {
                name: '',
                description: '',
                image: null,
                entranceCount: 1,
                exitCount: 1,
                levelType: 'Town'
            },
            origin: [0.8, 0.0]
        } as AppNode;

        addNodes(newNode);
    }, [getNode, addNodes]);

    return (
        <div style={styles} ref={ref}
             className={'shadow-lg rounded-lg p-4 z-50 w-80 flex flex-col items-stretch justify-center border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700'}
        >
            <p className={'pointer-events-none p-2 text-sm'}>Choose a node.</p>
            {Object.keys(nTypes).map((key, i) => (
                <div
                    key={i}
                    className={'border-2 border-cyan-700 rounded-lg p-2 cursor-grab flex justify-between bg-white dark:bg-gray-800'}
                    onClick={() => createNode('1')}
                    onDragStart={(event: DragEvent) => onDragStart(event, key)}
                    draggable
                >
                    <BsFillNodePlusFill size={'1.5em'}/>
                    <p className={'pr-6'}>Level</p>
                </div>
            ))}
        </div>
    );
}