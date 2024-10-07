'use client';

import {DragEvent, useCallback, useRef, useState} from 'react';
import {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    type DefaultEdgeOptions,
    Edge,
    type FitViewOptions,
    getOutgoers,
    MiniMap,
    type Node,
    NodeOrigin,
    ReactFlow,
    ReactFlowInstance, ReactFlowProvider,
    reconnectEdge,
    useEdgesState,
    useNodesState,
    useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import LevelNode from "../Nodes/LevelNode.tsx";
import NodeSidebar from "../NodeSidebar.tsx";
import Toaster from "../Toaster.tsx";
import {Flowbite} from "flowbite-react";
import {HelpModal} from "../GUI/HelpModal.tsx";

const nodeTypes = {levelNode: LevelNode};

const initialNodes: Node[] = [
    {id: '1', type: "levelNode", position: {x: 0, y: 0}, data: {label: '1'}},
    {id: '2', position: {x: -300, y: 0}, data: {label: '2'}},
    {id: '3', position: {x: -300, y: 50}, data: {label: '3'}},
];

const inputSettings = {
    deleteKeyCode: ['Backspace', 'Delete'],
}
const fitViewOptions: FitViewOptions = {
    padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
};

let id = 4;
const getId = () => `${id++}`;
const nodeOrigin: NodeOrigin = [0.5, 0.5];

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

function LevelNodeEditor() {
    //const [colorMode, setColorMode] = useState<ColorMode>('dark');
    const edgeReconnectSuccessful = useRef(true);
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
    const {getNodes, getEdges} = useReactFlow<Node, Edge>();

    const onReconnect = useCallback(
        (oldEdge: Edge, newConnection: Connection) =>
            setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
        [],
    );
    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    const onReconnectEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeReconnectSuccessful.current = true;
    }, []);
    const onConnect = (params: Connection | Edge) => {
        console.log(params)
        setEdges((eds) => addEdge(params, eds))
    };
    const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

    const onDrop = (event: DragEvent) => {
        event.preventDefault();

        if (reactFlowInstance) {
            const type = event.dataTransfer.getData('application/reactflow');
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode: Node = {
                id: getId(),
                type,
                position,
                data: {label: `${type} node`},
            };

            setNodes((nds) => nds.concat(newNode));
        }
    };
    const isValidConnection = useCallback(
        (connection: Edge | Connection): boolean => {
            const nodes = getNodes();
            const edges = getEdges();
            const target: Node | undefined = nodes.find((node) => node.id === connection.target);
            const hasCycle = (node?: Node, visited = new Set()) => {
                if (node == undefined) return false
                if (visited.has(node?.id)) return false;
                visited.add(node?.id);

                for (const outGoer of getOutgoers(node, nodes, edges)) {
                    if (outGoer.id === connection.source) return true;
                    if (hasCycle(outGoer, visited)) return true;
                }
            };

            if (target?.id === connection.source) return false;
            return !hasCycle(target);
        },
        [getNodes, getEdges],
    );
    return (
        <div className={"w-full h-full"}>
            <Toaster/>
            <div className={"z-40 absolute w-full pointer-events-none p-2"}>
                <Flowbite>
                    <div className={"flex justify-end gap-2"}>
                        <HelpModal/>
                        {/*<DarkThemeToggle className={"pointer-events-auto"}/>*/}
                    </div>
                </Flowbite>
            </div>
            <div style={{width: '100vw', height: '100vh'}}>
                <div className={"w-full h-full flex"}>
                    <NodeSidebar/>
                    <div className={"flex-grow reactflow2-wrapper"} ref={reactFlowWrapper}>
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
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            nodeOrigin={nodeOrigin}
                            fitView
                            attributionPosition="top-right"
                            isValidConnection={isValidConnection}
                        >
                            <Controls/>
                            <MiniMap/>
                            <Background variant={BackgroundVariant.Lines} gap={60} size={1}
                                        className={"opacity-20"}/>
                        </ReactFlow>
                    </div>

                </div>
            </div>
        </div>

    );
}
export default () => (
    <ReactFlowProvider>
        <LevelNodeEditor/>
    </ReactFlowProvider>
);