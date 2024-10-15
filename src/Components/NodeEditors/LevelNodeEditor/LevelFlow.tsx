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
    reconnectEdge,
    useEdgesState,
    useNodesState,
    useReactFlow
} from '@xyflow/react';
import React, {useCallback, useRef, useState} from 'react';
import {ContextModal, ContextModalData} from '../../Menus/ContextModal';
import {InspectorSidebar} from '../../Menus/InspectorSidebar';
import {CustomEdgeLine} from '../GlobalEdges/CustomEdge';
import {
    AppNode,
    defaultEdgeOptions, edgeTypes,
    GetTypesForFlow,
    initialNodes,
    LevelEditorNodeTypes
} from './Nodes/LevelEditorNodeTypes';

const inputSettings = {
    deleteKeyCode: ['Backspace', 'Delete']
};
const fitViewOptions: FitViewOptions = {
    padding: 1
};
const nodeOrigin: NodeOrigin = [0.0, 0.0];

function LevelFlow() {
    const edgeReconnectSuccessful = useRef(true);
    const reactFlowRef = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [editNode, setEditNode] = useState<AppNode | null>(null);
    const {setViewport} = useReactFlow();
    const flowKey = 'level-flow';
    const [isReconnecting, setIsReconnecting] = useState(false);
    const [menu, setMenu] = useState<ContextModalData | null>(null);
    const [reconnectingEdge, setReconnectingEdge] = useState<Edge | null>(null);

    const onReconnectStart = useCallback((event: React.MouseEvent, edge: Edge, handleType: 'source' | 'target') => {
        //console.log(edge, handleType);
        edgeReconnectSuccessful.current = false;
        setIsReconnecting(true);
        setReconnectingEdge(edge);
    }, [setIsReconnecting, edgeReconnectSuccessful]);

    const onReconnect = useCallback((oldEdge: Edge, newConnection: Connection) => {
        // console.log('On Reconnect - Edge: ', oldEdge);
        // console.log('On Reconnect - Connection: ', newConnection);
        edgeReconnectSuccessful.current = true;
        setEdges(els => reconnectEdge(oldEdge, newConnection, els));
    }, [setEdges]);

    const onReconnectEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            setEdges(eds => eds.filter(e => e.id !== edge.id));
        }
        edgeReconnectSuccessful.current = true;
        setIsReconnecting(false);
        setReconnectingEdge(null);
    }, [setEdges]);

    const onConnect = useCallback(
        (params: Connection) => {
            setEdges(eds => addEdge(params, eds));
        },
        [setEdges]
    );

    const onInit: (rfi: any) => void = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

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
            return connection.source !== connection.target;
        }, [isReconnecting, reconnectingEdge]
    );

    const onPaneContextMenu = useCallback(
        (e: MouseEvent | React.MouseEvent<Element, MouseEvent>) => {
            e.preventDefault();
            if (!reactFlowRef.current) return;

            // @ts-ignore
            const pane = reactFlowRef.current.getBoundingClientRect();
            let top = e.clientY;
            let left = e.clientX;
            const yOffset = 50;
            const xOffset = 350;

            if (top + yOffset > pane.bottom) {
                top = pane.bottom - yOffset;
            }
            if (left + xOffset > pane.right) {
                left = pane.right - xOffset;
            }
            setMenu({top, left});
        },
        [setMenu]
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
                fitView
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={GetTypesForFlow(LevelEditorNodeTypes)}
                {...inputSettings}
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
                colorMode={'dark'}
                onInit={onInit}
                onReconnect={onReconnect}
                onReconnectStart={onReconnectStart}
                onReconnectEnd={onReconnectEnd}
                nodeOrigin={nodeOrigin}
                attributionPosition="top-right"
                isValidConnection={isValidConnection}
                onPaneContextMenu={onPaneContextMenu}
                ref={reactFlowRef}
                onClick={onPaneClick}
                edgeTypes={edgeTypes}
                onSelectionChange={onSelectionChange}
                edgesReconnectable={true}
            >
                <Controls position={'bottom-left'} style={{left: 70}}/>
                <MiniMap pannable inversePan zoomable
                         zoomStep={1}
                         nodeBorderRadius={50}
                         nodeStrokeWidth={10}
                         nodeStrokeColor={'#7209B7'}
                         maskStrokeColor={'#7c1125'}
                         maskStrokeWidth={1}
                         maskColor={'#101a1c'}
                         nodeColor={'#101a1c'}
                         className={'opacity-80'}/>
                <Background variant={BackgroundVariant.Dots} gap={60} size={5}
                            className={'opacity-20'}/>
                {menu && <ContextModal {...menu}/>}
                <CustomEdgeLine/>
                <Panel position={'top-right'} id={'data-sidebar'}>
                    <InspectorSidebar nodeData={editNode} onNodeDataChange={(updatedData?: AppNode) => {
                        if (updatedData)
                            updateNodeData(updatedData);
                    }}
                    />
                </Panel>
                {/*<button className={'absolute top-20 left-40 z-50 pointer-events-auto'}*/}
                {/*    onClick={() => {}}>Test</button>*/}
            </ReactFlow>
        </>
    );
}

export default () =>
    <LevelFlow/>