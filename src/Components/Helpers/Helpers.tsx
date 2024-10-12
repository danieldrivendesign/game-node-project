import {Handle, HandleType, Position} from '@xyflow/react';
import {AppNode} from '../Nodes';

export type CreateHandleProps = { id: string, type: HandleType, index: number, isConnectable: boolean }

const handleOffset = 20;

type HandleGenerateProps = {
    count: number,
    type: HandleType,
    position: Position,
    nodeId: string,
    index: number,
    isConnectable: boolean
}

export const createHandle = (props: HandleGenerateProps) => {
    return (
        <Handle
            key={`${props.type}-${props.index}`}
            type={props.type}
            position={props.position}
            id={`${props.nodeId}-${props.type[0]}${props.index}`}
            style={{top: handleOffset * (props.index + 1)}}
            isConnectable={props.isConnectable}
            className={'w-2 h-2 border-2 border-gray-300 bg-cyan-300'}
        />
    );
};

let id = 0;

export function createId(): string {
    return (id++).toString();
}

type CreateNodeProps = {
    nodeType: string,
    position: {
        x: number, y: number
    }
}


function createLevelNode(): AppNode {
    return {
        id: createId(),
        position: {x: 0, y: 0},
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
    };
}

export function createNode({nodeType, position}: CreateNodeProps): AppNode | null {
    switch (nodeType) {
        case 'levelNode':
            return createLevelNode();
    }
    return null;
}