import {
    HandleType,
    type Node,
    type NodeProps,
    NodeResizeControl,
    Position,
    useUpdateNodeInternals
} from '@xyflow/react';
import React, {CSSProperties, memo, ReactElement, useCallback, useEffect, useState} from 'react';
import {ResizeIcon} from '../../../../assets/ResizeIcon';
import {GetMetadataFromType} from '../../../Helpers/Helpers';
import {PropertyMetadata} from '../../../Types/NodeMetadata';
import HandleLimited from '../../GlobalHandles/HandleLimited';
import {LevelNodeData} from './LevelEditorNodeTypes';

type HandleGenerateProps = {
    count: number,
    type: HandleType,
    position: Position
}

function CreateLabel(text: string) {
    return (
        <div className="inline-flex items-center justify-center w-full">
            <hr className="w-4 h-[.2rem] bg-teal-600 border-0 dark:bg-blue-800 opacity-80 shadow shadow-teal-800 rounded-lg"/>
            <span
                className="px-3 text-sm text-pink-800/75 font-mono font-semibold align-center italic tracking-tight">{text.toReadableString()}</span>
            <hr className="flex-grow h-[.2rem] bg-teal-600 border-0 dark:bg-blue-800 opacity-80 shadow shadow-teal-800 rounded-lg"/>
        </div>
    );
}

export interface ITextProps {
    text: string;
    lineClamp: 'line-clamp-1' | 'line-clamp-2' | 'line-clamp-3' | 'line-clamp-4' | 'line-clamp-5' | 'line-clamp-6';
}

function ImageDisplay(image: string) {
    return (
        <img style={{maxWidth: '350px', maxHeight: '300px'}}
             className="shadow rounded-lg object-scale-down object-center w-full m-2 p-2" src={image}
             alt="map"/>
    );
}

function TextDisplay({text, lineClamp}: ITextProps) {

    return (
        <div className={'flex flex-col items-stretch'}>
            {CreateLabel(text)}
            <p className={`${lineClamp} indent-5`}>{text.toTitleCase()}</p>
        </div>
    );
}

export function NodeDataDisplayFactory(nodeData: any, nodeType: string) {
    const [children, setChildren] = useState<ReactElement[]>([]);

    function SetChildren() {
        const nodeMetadata: Record<string, PropertyMetadata> | null = GetMetadataFromType(nodeType);
        if (!nodeMetadata) return null;

        const newChildren: ReactElement[] = [];
    }

    function SetMetaData(nodeMetadata: Record<string, PropertyMetadata>, newChildren: ReactElement[]) {
        if (nodeData?.data == null) return;

        for (const propName in nodeData.data) {
            if (!nodeMetadata[propName]) continue;

            const props = {
                propName: propName,
                data: nodeData.data,
                id: `${nodeData.id}-${propName}`,
                metaData: nodeMetadata[propName]
            };

            //const item = FormFactory(props);
            // if (item != null) {
            //     newChildren.push(item);
            // }
        }
    }

    useEffect(() => {
        if (!nodeData) {
            setChildren([]);
            return;
        }
        const nodeMetadata: Record<string, PropertyMetadata> | null = GetMetadataFromType(nodeType);
        if (!nodeMetadata) {
            setChildren([<></>]);
            return;
        }
        const newChildren: ReactElement[] = [];

        SetMetaData(nodeMetadata, newChildren);
        setChildren(newChildren);

    }, [nodeData]);

    return (
        <></>
    );
}


export default memo(({id, data, isConnectable, type}: NodeProps<Node<LevelNodeData>>) => {
    const updateNodeInternals = useUpdateNodeInternals();
    const [image, setImage] = useState<string>('src/assets/no-image-available.webp');
    const [levelData, setLevelData] = useState<LevelNodeData>(data);
    const handleOffset = 30;

    const generateHandles: (props: HandleGenerateProps) => ReactElement[] = useCallback((props: HandleGenerateProps) => {
        return Array.from({length: props.count}).map((_, i) => (
            <HandleLimited
                id={`handle-${id}_${props.type}-${i}`}
                connectionLimit={1}
                type={props.type}
                position={props.position}
                key={`${id}-${props.type.substring(0)}-handle-${i}`}
                style={{top: `${20 + (i * handleOffset)}px`}}
            />
        ));
    }, [handleOffset, id, isConnectable]);

    useEffect(() => {
        if (data.image) {
            setImage(data.image);
        } else {
            setImage('src/assets/no-image-available.webp');
        }
        setLevelData(data);
    }, [data]);

    useEffect(() => {
        updateNodeInternals(id);
    }, [levelData, updateNodeInternals, id, data.entranceCount, data.exitCount]);

    const targetHandles = generateHandles({
        count: levelData?.entranceCount || 1,
        type: 'target',
        position: Position.Left
    });
    const sourceHandles = generateHandles({
        count: levelData?.exitCount || 1,
        type: 'source',
        position: Position.Right
    });

    const controlStyle: CSSProperties = {
        background: 'transparent',
        border: 0,
        borderStyle: 'none'
    };

    return (
        <>
            <div className={'wrapper gradient h-full w-full relative min-w-[30rem]'}>
                <div className={'flex flex-col'}>
                    <div
                        className={'h-10 min-h-10 w-full bg-secondary rounded-t-lg shadow items-center justify-center flex drag-handle'}>
                        <h1 className={'line-clamp-2 font-bold'}>{type?.toReadableString()}</h1>
                    </div>
                    <NodeResizeControl style={controlStyle} minWidth={550} minHeight={300}>
                        <ResizeIcon/>
                    </NodeResizeControl>
                    <div className={'flex cursor-pointer h-full w-full'}>
                        <img style={{maxWidth: '350px', maxHeight: '300px'}}
                             className="shadow rounded-lg object-scale-down object-center w-full m-2 p-2" src={image}
                             alt="map"/>
                        <div className="p-5 flex flex-col gap-4 content-between min-h-60 w-full">
                            <div className={'flex flex-col items-stretch'}>
                                {CreateLabel('name')}
                                <p className={'line-clamp-2 indent-5'}>{levelData?.name?.toTitleCase()}</p>
                            </div>
                            <div className={'flex flex-col items-stretch'}>
                                {CreateLabel('description')}
                                <p className={'line-clamp-3 indent-5'}>{levelData?.description}</p>
                            </div>
                            <div className={'flex flex-col items-stretch'}>
                                {CreateLabel('type')}
                                <p className={'line-clamp-3 indent-5'}>{levelData?.levelType}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {targetHandles}
            {sourceHandles}
        </>
    );
});