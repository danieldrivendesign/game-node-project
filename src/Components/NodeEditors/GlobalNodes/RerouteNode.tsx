import {Node, NodeProps, Position} from '@xyflow/react';
import {memo} from 'react';
import HandleLimited from '../GlobalHandles/HandleLimited';

export type RerouteNodeData = {}

export default memo(({}: NodeProps<Node<RerouteNodeData>>) => {

    return (
        <>
            <HandleLimited position={Position.Left} type={'target'} connectionLimit={1}/>
            <HandleLimited position={Position.Right} type={'source'} connectionLimit={1}/>
            <div className={'wrapper gradient w-14 h-8'}>
                <div className={''}>

                    <div className={'bg-secondary w-1'}/>
                </div>
            </div>
        </>
    );
});