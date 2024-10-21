import type {Node} from '@xyflow/react';
import {BsFillNodePlusFill} from 'react-icons/bs';
import {MdOutlineRoute} from 'react-icons/md';
import {createId} from '../../../Helpers/Helpers';
import RerouteNode, {RerouteNodeData} from '../../GlobalNodes/RerouteNode';
import {EditorNodeType} from '../../LevelNodeEditor/Nodes/LevelEditorNodeTypes';

export type AppNode = Node<GameStateData> | Node<RerouteNodeData>;

export const initialNodes: AppNode[] = [
    {
        id: createId(),
        type: 'gameStateNode',
        position: {x: 0, y: 0},
        data: {
            name: 'Overworld',
            description: '',
            image: null,
        },
        dragHandle: '.drag-handle'
    },
    {
        id: createId(),
        type: 'gameStateNode',
        position: {x: -800, y: 0},
        data: {
            name: 'Battle',
            description: 'For battlin',
            image: null,
        },
        dragHandle: '.drag-handle'
    },
    {
        id: createId(),
        type: 'gameStateNode',
        position: {x: -800, y: 0},
        data: {
            name: 'Battle',
            description: 'For battlin',
            image: null,
        },
        dragHandle: '.drag-handle'
    },
];

export type GameStateData = {
    name?: string,
    description?: string,
    image?: string | null,
}

export const GameStateEditorNodeTypes: EditorNodeType[] = [
    {
        type: 'gameStateNode',
        icon: <BsFillNodePlusFill size={'1.5em'}/>,
        component: <></>,
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



