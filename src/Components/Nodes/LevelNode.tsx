import {
    HandleType,
    type Node,
    type NodeProps,
    NodeResizeControl,
    Position,
    useUpdateNodeInternals
} from '@xyflow/react';
import {memo, useCallback, useEffect, useState} from 'react';
import {createHandle} from '../Helpers/Helpers';
import {LevelNodeData} from './index';
import {ResizeIcon} from './ResizeIcon';

type HandleGenerateProps = {
    count: number,
    type: HandleType,
    position: Position
}
export default memo(({id, data, isConnectable}: NodeProps<Node<LevelNodeData>>) => {
    const updateNodeInternals = useUpdateNodeInternals();
    const [image, setImage] = useState<string>('src/assets/no-image-available.webp');
    const [levelData, setLevelData] = useState<LevelNodeData>(data);
    const handleOffset = 50;

    const generateHandles = useCallback((props: HandleGenerateProps) => {
        return Array.from({length: props.count}).map((_, i) => (
            createHandle({...props, index: i, isConnectable: isConnectable, nodeId: id})
        ));
    }, [handleOffset, id, isConnectable]);

    useEffect(() => {
        if (data.image) {
            setImage(URL.createObjectURL(data.image));
        } else {
            setImage('src/assets/no-image-available.webp');
        }
        setLevelData(data);
    }, [data]);

    useEffect(() => {
        updateNodeInternals(id);
    }, [levelData, updateNodeInternals, id]);

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

    const controlStyle = {
        background: 'transparent',
        border: 'none'
    };

    return (
        <div className={'bg-white dark:bg-gray-800 flex h-full w-full rounded-lg'}>
            <NodeResizeControl style={controlStyle} minWidth={550} minHeight={200}>
                <ResizeIcon/>
            </NodeResizeControl>
            <img style={{maxWidth: '350px', maxHeight: '300px'}}
                 className="rounded-lg object-scale-down object-center w-full m-2" src={image}
                 alt="map"/>

            <div className="p-5 flex flex-col gap-4 content-between min-h-60 w-full">
                <div>
                    <h3>Name</h3>
                    <p className={'line-clamp-2'}>{levelData?.name?.toTitleCase()}</p>
                </div>
                <div>
                    <h3>Description</h3>
                    <p className={'line-clamp-3'}>{levelData?.description}</p>
                </div>
                <div>
                    <h3>Type</h3>
                    <p>{levelData?.levelType}</p>
                </div>
            </div>
            {targetHandles}
            {sourceHandles}
        </div>
    );
});