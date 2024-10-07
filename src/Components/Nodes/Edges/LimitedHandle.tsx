import {Handle, useHandleConnections} from '@xyflow/react';

type LimitedHandle = Handle & {
    connectionLimit: number;
}
const LimitedHandle = (props: any) => {
    const connections = useHandleConnections({
        type: props.type,
    });
    return (
        <>
            <Handle
                {...props}
                isConnectable={connections.length < props.connectionLimit}
            />
            <p>IsConnectable: {connections.length < props.connectionLimit}</p>
        </>
    );
};

export default LimitedHandle;
