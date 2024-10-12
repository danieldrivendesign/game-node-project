import {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    type FitViewOptions,
    MiniMap,
    NodeOrigin,
    OnSelectionChangeParams,
    Panel,
    ReactFlow,
    ReactFlowInstance,
    ReactFlowProvider,
    reconnectEdge,
    useEdgesState,
    useNodesState,
    useReactFlow
} from '@xyflow/react';
import React, {DragEvent, useCallback, useRef, useState} from 'react';
import {ContextModal, ContextModalData} from '../../Menus/ContextModal';
import {InspectorSidebar} from '../../Menus/InspectorSidebar';
import {AppNode, initialNodes, nodeTypes} from '../../Nodes';
import TurboEdge, {CustomEdgeLine} from '../../Nodes/Edges/TurboEdge';

const inputSettings = {
    deleteKeyCode: ['Backspace', 'Delete']
};
const fitViewOptions: FitViewOptions = {
    padding: 2
};

const nodeOrigin: NodeOrigin = [0.0, 0.0];

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

const edgeTypes = {
    turbo: TurboEdge
};
const defaultEdgeOptions = {
    type: 'turbo'
    // markerEnd: 'edge-circle',
};

function LevelFlow() {
    const edgeReconnectSuccessful = useRef(true);
    const reactFlowRef = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const {getNodes, getEdges} = useReactFlow<AppNode, Edge>();
    const [editNode, setEditNode] = useState<AppNode | null>(null);
    const {setViewport} = useReactFlow();
    const flowKey = 'level-flow';
    const [isReconnecting, setIsReconnecting] = useState(false);
    const [menu, setMenu] = useState<ContextModalData | null>(null);

    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
        setIsReconnecting(true);
    }, [setIsReconnecting, edgeReconnectSuccessful]);

    const onReconnect = useCallback((oldEdge: Edge, newConnection: Connection) => {
        edgeReconnectSuccessful.current = true;
        setEdges(els => reconnectEdge(oldEdge, newConnection, els));
    }, [setIsReconnecting, edgeReconnectSuccessful]);

    const onReconnectEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            setEdges(eds => eds.filter(e => e.id !== edge.id));
        }
        edgeReconnectSuccessful.current = true;
        setIsReconnecting(false);
    }, [setIsReconnecting, edgeReconnectSuccessful]);

    const onConnect = useCallback(
        (params: Connection) => {
            setEdges(eds => addEdge(params, eds));
        },
        [setEdges]
    );

    const onInit: (rfi: any) => void = (rfi) => setReactFlowInstance(rfi);

    const onSave: () => void = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [reactFlowInstance]);

    const onRestore: () => Promise<void> = useCallback(async () => {
        const restoreFlow: () => Promise<void> = async () => {
            const storage: string | null = localStorage.getItem(flowKey);
            if (storage === null) return;
            const flow = JSON.parse(storage);

            if (flow) {
                const {x = 0, y = 0, zoom = 1} = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                await setViewport({x, y, zoom});
            }
        };
        await restoreFlow();
    }, [setNodes, setViewport]);

    const isValidConnection: (connection: Edge | Connection) => boolean = useCallback(
        (connection: Edge | Connection): boolean => {
            if (isReconnecting) {
                return true;
            }
            if (connection.target === connection.source) return false;
            return !getEdges().some(e =>
                e.targetHandle == connection.targetHandle || e.sourceHandle == connection.sourceHandle
            );
        }, [getNodes, getEdges]
    );

    const onPaneContextMenu = useCallback(
        (e: MouseEvent | React.MouseEvent<Element, MouseEvent>) => {
            e.preventDefault();
            if (!reactFlowRef.current) return;

            // @ts-ignore
            const pane = reactFlowRef.current.getBoundingClientRect();
            let top = e.clientY + 100;
            let left = e.clientX + 300;
            const yOffset = 100;
            const xOffset = 300;

            if (top + yOffset > pane.bottom) {
                top = pane.bottom - yOffset;
            }
            if (left + xOffset > pane.right) {
                left = pane.right - xOffset;
            }
            setMenu({top, left});
        },
        [setMenu, reactFlowInstance]
    );

    const onPaneClick = useCallback((_: React.MouseEvent) => {
        setMenu(null);
    }, [setMenu]);

    const updateNodeData: (updatedNode: AppNode) => void = (updatedNode: AppNode) => {
        reactFlowInstance?.updateNodeData(updatedNode.id, updatedNode.data);
    };

    const onSelectionChange: (params: OnSelectionChangeParams) => void = useCallback((params: OnSelectionChangeParams) => {
        setEditNode(params.nodes.length < 1 ? null : params.nodes[0] as AppNode);
    }, [setEditNode]);

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                {...inputSettings}
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
                colorMode={'dark'}
                onInit={onInit}
                onReconnect={onReconnect}
                onReconnectStart={onReconnectStart}
                onReconnectEnd={onReconnectEnd}
                // onDrop={onDrop}
                // onDragOver={onDragOver}
                nodeOrigin={nodeOrigin}
                fitView
                attributionPosition="top-left"
                isValidConnection={isValidConnection}
                onPaneContextMenu={onPaneContextMenu}
                ref={reactFlowRef}
                onClick={onPaneClick}
                edgeTypes={edgeTypes}
                onSelectionChange={onSelectionChange}
                edgesReconnectable={true}
            >
                {/*<p className={'absolute top-20 left-20'}>Reconnecting: {isReconnecting.toString()}</p>*/}
                <Controls/>
                <MiniMap nodeBorderRadius={20} nodeStrokeWidth={10} nodeStrokeColor={'cyan'} maskStrokeColor={'cyan'}
                         maskStrokeWidth={1} pannable inversePan zoomable/>
                <Background variant={BackgroundVariant.Dots} gap={60} size={5}
                            className={'opacity-20'}/>
                {menu && <ContextModal {...menu}/>}
                <CustomEdgeLine/>
                <Panel position={'top-right'} id={'data-sidebar'}>
                    <InspectorSidebar
                        nodeData={editNode}
                        onNodeDataChange={(updatedData?: AppNode) => {
                            if (updatedData)
                                updateNodeData(updatedData);
                        }}
                    />
                </Panel>
            </ReactFlow>
        </>
    );
}

export default () =>
    <ReactFlowProvider>
        <LevelFlow/>
    </ReactFlowProvider>;