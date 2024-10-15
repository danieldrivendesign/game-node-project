import {HandleType, Position, XYPosition} from '@xyflow/react';
import CustomHandle from '../NodeEditors/GlobalHandles/HandleLimited';
import {AppNode} from '../NodeEditors/LevelNodeEditor/Nodes/LevelEditorNodeTypes';
import {nodeMetadataRegistry, PropertyMetadata} from '../Types/NodeMetadata';

const handleOffset = 20;

export type HandleGenerateProps = {
    type: HandleType,
    position: Position,
    index: number,
    connectionLimit?: number,
}

export const createHandle = (props: HandleGenerateProps) => {
    return (
        <CustomHandle
            connectionLimit={props.connectionLimit}
            type={props.type}
            position={props.position}
            key={`${props.type}-${props.index}`}
            style={{top: handleOffset * (props.index + 1)}}
        />
    );
};

let id: number = 0;

export function createId(): string {
    return (id++).toString();
}

export function createLevelNode(position: XYPosition): AppNode {
    return {
        id: createId(),
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
        origin: [0.8, 0.0],
        dragHandle: '.drag-handle'
    };
}

function createRerouteNode(position: XYPosition): AppNode {
    return {
        id: createId(),
        position: position,
        type: 'rerouteNode',
        data: {},
        origin: [0.8, 0.0]
    };
}

type CreateNodeProps = {
    nodeType: string,
    position?: XYPosition
}

export function createNode({nodeType, position}: CreateNodeProps): AppNode | null {
    switch (nodeType) {
        case 'levelNode':
            return createLevelNode(position ?? {x: 0, y: 0});
        case 'rerouteNode':
            return createRerouteNode(position ?? {x: 0, y: 0});
    }
    return null;
}

export function GetMetadataFromType(nodeType: string): Record<string, PropertyMetadata> | null {
    const found = nodeMetadataRegistry.hasOwnProperty(nodeType);
    if (!found) return null;
    return nodeMetadataRegistry[nodeType];
}