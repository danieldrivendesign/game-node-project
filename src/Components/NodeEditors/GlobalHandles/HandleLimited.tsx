import {Handle, HandleType, Position, useHandleConnections} from '@xyflow/react';
import React, {CSSProperties, useContext, useEffect, useState} from 'react';
import {DebugProvider} from '../../Debug/DebugProvider';

export type CustomHandleProps = {
    id: string,
    type: HandleType,
    position: Position,
    isConnectable?: boolean,
    connectionLimit?: number,
    style?: CSSProperties,
    dataType?: string
}

const HandleLimited = ({id, type, position, style, connectionLimit = 1, dataType = 'none'}: CustomHandleProps) => {
    const connections = useHandleConnections({
        type: type,
        id: id
    });
    const [hasConnection, setHasConnection] = useState(false);
    const showDebug = useContext(DebugProvider);

    useEffect(() => {
        setHasConnection(connections.length >= (connectionLimit ?? 99));
    }, [connections]);

    return (
        <Handle
            id={id}
            type={type}
            position={position}
            isConnectable={!hasConnection}
            className={'w-2 h-2' + (hasConnection ? ' bg-blue-800' : ' ')}
            style={style}>
            <div>
                {showDebug &&
                    <div className={'flex bg-gray-700 w-28 mt-5 rounded-lg'}>
                        <p className={'text-cyan-400 p-2 text-sm'}>Current: {connections.length.toString()}</p>
                        {connectionLimit &&
                            <p className={'text-red-500 p-2 text-sm'}>Limit: {connectionLimit.toString()}</p>}
                    </div>
                }
            </div>
        </Handle>
    );
};

export default HandleLimited;
