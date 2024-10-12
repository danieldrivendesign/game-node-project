import type {Node, NodeTypes} from '@xyflow/react';
import {createId} from '../Helpers/Helpers';
import LevelNode from './LevelNode';

export type LevelType = 'Town' | 'Field' | 'Dungeon'

export type LevelNodeData = {
    name?: string,
    description?: string,
    image?: File | null,
    entranceCount: number,
    exitCount: number,
    levelType: LevelType,
}

export type AppNode = Node<LevelNodeData>;

export const initialNodes: AppNode[] = [
    {
        id: createId(),
        type: 'levelNode',
        position: {x: 0, y: 0},
        data: {name: '', description: '', image: null, entranceCount: 1, exitCount: 1, levelType: 'Town'},
    },
    {
        id: createId(),
        type: 'levelNode',
        position: {x: -800, y: 0},
        data: {name: 'none', description: 'none', image: null, entranceCount: 1, exitCount: 1, levelType: 'Town'},
    }
];

export const nodeTypes = {
    'levelNode': LevelNode
    // Add custom nodes here
} satisfies NodeTypes;
