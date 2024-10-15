import type {Node, NodeTypes, XYPosition} from '@xyflow/react';
import {ReactElement} from 'react';
import {BsFillNodePlusFill} from 'react-icons/bs';
import {MdOutlineRoute} from 'react-icons/md';
import {createId} from '../../../Helpers/Helpers';
import CustomEdge from '../../GlobalEdges/CustomEdge';
import RerouteNode, {RerouteNodeData} from '../../GlobalNodes/RerouteNode';
import LevelNode from './LevelNode';

export type LevelType = 'Town' | 'Field' | 'Dungeon'

export type AppNode = Node<LevelNodeData> | Node<RerouteNodeData>;

export const initialNodes: AppNode[] = [
    {
        id: createId(),
        type: 'levelNode',
        position: {x: 0, y: 0},
        data: {
            name: '',
            description: '',
            image: null,
            entranceCount: 1,
            exitCount: 1,
            levelType: 'Town'
        },
        dragHandle: '.drag-handle'
    },
    {
        id: createId(),
        type: 'levelNode',
        position: {x: -800, y: 0},
        data: {
            name: 'Crossbell',
            description: 'A name of a town i stole from Trails from Zero',
            image: null,
            entranceCount: 1,
            exitCount: 1,
            levelType: 'Town'
        },
        dragHandle: '.drag-handle'
    },
    {
        id: createId(),
        type: 'rerouteNode',
        position: {x: -100, y: -200},
        data: {}
    }
];

export const nodeTypes = {
    'levelNode': LevelNode,
    'rerouteNode': RerouteNode
    // Add custom nodes here
} satisfies NodeTypes;

export const edgeTypes = {
    turbo: CustomEdge
};
export const defaultEdgeOptions = {
    type: 'turbo'
    // markerEnd: 'edge-circle',
};

export type EditorNodeType = {
    type: string;
    icon: ReactElement | null;
    component: any,
    data: any,
    dragHandle?: string | null,
    position: XYPosition,
}

export type LevelNodeData = {
    name?: string,
    description?: string,
    image?: File | null,
    entranceCount: number,
    exitCount: number,
    levelType: LevelType,
}

export const LevelEditorNodeTypes: EditorNodeType[] = [
    {
        type: 'levelNode',
        icon: <BsFillNodePlusFill size={'1.5em'}/>,
        component: LevelNode,
        data: {},
        dragHandle: '.drag-handle',
        position: {x: 0, y: 0}
    },
    {
        type: 'rerouteNode',
        icon: <MdOutlineRoute size={'1.5em'}/>,
        component: RerouteNode,
        data: {},
        position: {x: 0, y: 0}
    }
];

export function GetTypesForFlow(items: any) {
    const jsonData: any = {};
    items.map((item: any) => {
        jsonData[item.type] = item.component;
    });
    return jsonData;
}



