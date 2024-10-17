import {HandleType, Position, useUpdateNodeInternals, XYPosition} from '@xyflow/react';
import {useEffect} from 'react';
import HandleLimited from '../NodeEditors/GlobalHandles/HandleLimited';
import {AppNode} from '../NodeEditors/LevelNodeEditor/Nodes/LevelEditorNodeTypes';
import {nodeMetadataRegistry, PropertyMetadata} from '../Types/NodeMetadata';

const handleOffset = 20;

export type HandleGenerateProps = {
    type: HandleType,
    position: Position,
    index: number,
    connectionLimit?: number
}

// export const createHandle = (props: HandleGenerateProps) => {
//     return (
//         <HandleLimited
//             connectionLimit={props.connectionLimit}
//             type={props.type}
//             position={props.position}
//             key={`${props.type}-${props.index}`}
//             style={{top: handleOffset * (props.index + 1)}}
//         />
//     );
// };

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

export const encodeImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Data = reader.result as string;
            resolve(base64Data);
        };
        reader.onerror = (error) => reject(error);
    });
};
export const resizeAndEncodeImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    } else {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const resizedData = canvas.toDataURL(file.type);
                    resolve(resizedData);
                } else {
                    reject(new Error("Failed to create canvas context"));
                }
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};

export const decodeImageFromBase64 = (escapedData: string): string => {
    return decodeURIComponent(escapedData);
};