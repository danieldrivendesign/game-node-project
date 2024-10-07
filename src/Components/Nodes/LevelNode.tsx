import {Card, Label, Textarea, TextInput} from "flowbite-react";
import {memo, useMemo, useState} from "react";
import {Handle, NodeProps, Position, useUpdateNodeInternals} from '@xyflow/react';
import {useToast} from "../ToastContext.tsx";
import LimitedHandle from "./Edges/LimitedHandle.tsx";

//export default function LevelNode({data, isConnectable}: { data: any, isConnectable: boolean }) {

function TextAreaInputSwap() {
    const [isEditing, setEditing] = useState<boolean>(false);
    const [text, setText] = useState<string>('Description');
    return (
        <>
            <div onClick={() => setEditing(true)}>
                {
                    isEditing ?
                        <form onSubmit={() => setEditing(false)}>
                            <Label htmlFor="text" className={"pr-4 justify-center"}>Enter Description:</Label>
                            <Textarea id="text" name="text" className="nodrag bg-white text-black rounded-md"
                                      onBlur={() => {
                                          setEditing(false)
                                      }}
                                      onChange={(e) => setText(e.target.value)}/>
                        </form> :
                        <>
                            <h3>Description: </h3>
                            <p>{text}</p>
                        </>
                }
            </div>
        </>
    )
}

function TextInputSwap() {
    const [isEditing, setEditing] = useState<boolean>(false);
    const [text, setText] = useState<string>('None');
    return (
        <>
            <div onClick={() => setEditing(true)}>
                {
                    isEditing ?
                        <form onSubmit={() => setEditing(false)}>
                            <Label htmlFor="text" className={"pr-4"}>Enter Name:</Label>
                            <TextInput id="text" name="text" className="nodrag bg-white text-black rounded-md"
                                       onBlur={() => {
                                           setEditing(false)
                                       }}
                                       onChange={(e) => setText(e.target.value)}/>
                        </form> :
                        <h3>Name: {text}</h3>
                }
            </div>
        </>
    )
}

function LevelNode({ id, data }: NodeProps) {
    const [image, setImage] = useState<string>('src/assets/no-image-available.webp');
    const [handleCount, setHandleCount] = useState(1);
    const updateNodeInternals = useUpdateNodeInternals();
    const {sendToast} = useToast();
    const maxHandleCount = 3

    // useStore((s) => {
    //     const localEdges = s.edges.filter((e) => e.target === id);
    //     if (localEdges.length > handleCount) {
    //         setHandleCount(() => {
    //             updateNodeInternals(id);
    //             return localEdges.length;
    //         });
    //     }
    //     console.log("check edge")
    //     return localEdges;
    // });

    // const onConnect = () => {
    //     console.log("connection")
    //     if (handleCount >= maxHandleCount) {
    //         sendToast('Max Exceeded')
    //         return
    //     }
    //     setHandleCount(handleCount + 1)
    //     updateNodeInternals(id)
    // };
    const handles = useMemo(
        () =>
            Array.from({length: handleCount}, (_: any, i: number) => {
                const handleId = `${i}`;
                return (
                    <LimitedHandle
                        key={handleId}
                        type="target"
                        position={Position.Left}
                        id={`${id}-h${handleId}`}
                        style={{top: 10 * i + 15}}
                        connectionLimit={1}
                    />
                );
            }),
        [handleCount]
    );

    return (
        <div>
            <Card
                imgSrc={image}
                imgAlt={"Map"}
                className={"max-w-xs text-xs"}
            >
                <TextInputSwap/>
                <TextAreaInputSwap/>
                {handles}
                {/*{edges.map((_, i) => {*/}
                {/*    const handleId = `handle-${i}`;*/}
                {/*    return (*/}
                {/*        <CustomHandle*/}
                {/*        key={handleId}*/}
                {/*        type="target"*/}
                {/*        position={Position.Left}*/}
                {/*        id={handleId}*/}
                {/*        style={{top: 10 * i + 15}}*/}
                {/*        connectionCount={1}*/}
                {/*    />*/}
                {/*    )*/}
                {/*})}*/}
                <LimitedHandle
                    key={'handleId-12'}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${'handleId-12'}`}
                    style={{top: 10 + 15}}
                    connectionLimit={1}
                />
                {/*<Handle type={"source"} position={Position.Right}/>*/}
            </Card>
        </div>
    );
}

export default memo(LevelNode)