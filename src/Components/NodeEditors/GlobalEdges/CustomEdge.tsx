import {type EdgeProps, getBezierPath} from '@xyflow/react';
import React from 'react';

export function CustomEdgeLine() {
    return (
        <svg>
            <defs>
                <linearGradient id="edge-gradient">
                    <stop offset="0%" stopColor="#ae53ba"/>
                    <stop offset="100%" stopColor="#2a8af6"/>
                </linearGradient>
                <marker
                    id="edge-circle"
                    viewBox="-5 -5 10 10"
                    refX="0"
                    refY="0"
                    markerUnits="strokeWidth"
                    markerWidth="10"
                    markerHeight="10"
                    orient="auto"
                >
                    <circle stroke="#2a8af6" strokeOpacity="0.75" r="1" cx="0" cy="0"/>
                </marker>
            </defs>
        </svg>
    );
}

export default function CustomEdge({
                                       id,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       sourcePosition,
                                       targetPosition,
                                       style = {},
                                       markerEnd
                                   }: EdgeProps) {
    const xEqual = sourceX === targetX;
    const yEqual = sourceY === targetY;

    const [edgePath] = getBezierPath({
        sourceX: xEqual ? sourceX + 0.0001 : sourceX,
        sourceY: yEqual ? sourceY + 0.0001 : sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
        </>
    );
}