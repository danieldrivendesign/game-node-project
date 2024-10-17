import {Edge, useReactFlow} from '@xyflow/react';
import {useState} from 'react';

export default function TestBar() {
    const reactFlow = useReactFlow();
    const [handles, setHandles] = useState<Edge[]>([]);

    // useState(() => {
    //     const edges = reactFlow.getEdges()
    //     setHandles(edges)
    // }, [reactFlow]);

    return (
        <aside className={'p-4'}>
            <p>{handles.map((n) =>
                <div>{n.target}</div>
            )}</p>
        </aside>
    );
}
