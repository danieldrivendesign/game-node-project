import {Handle, HandleType, Position, useStore, useUpdateNodeInternals} from '@xyflow/react';
import {useState} from "react";
import {Button} from "flowbite-react";
import {useToast} from "./ToastContext.tsx";


interface ICustomHandleProps {
    handleType: HandleType,
    handlePosition?: Position
}

// function CustomHandle({handleType, handlePosition = Position.Left}: ICustomHandleProps){
//
// }
const HandleHolder = ({handleType, handlePosition = Position.Left}: ICustomHandleProps) => {
    const updateNodeInternals = useUpdateNodeInternals();
    const [handleCount, setHandleCount] = useState(5);
    const { sendToast } = useToast();
    const maxHandleCount = 10

    const edges = useStore((s) => {
        const edgs = s.edges.filter((e) => e.target === id);
        if (edgs.length !== handleCount) {
            setHandleCount(() => {
                updateNodeInternals(id);
                return edgs.length;
            });
        }
        return edgs;
    });
    function AddHandle() {
        const id = handleCount + 1
        if (id > maxHandleCount) {
            console.log("please")
            sendToast("hello")
            return;
        }
        setHandleCount(id)
        updateNodeInternals(`handle-${handleCount}`);
    }

    function RemoveHandle() {
        const id = handleCount - 1
        if (id < 0){
            sendToast("nope")
            return
        }
        setHandleCount(id)
        updateNodeInternals(`handle-${handleCount}`);
    }

    const pos = handlePosition == Position.Left ? "left-0" : "right-0";
    return (
        <div className={""}>
            <div className={` absolute flex flex-col gap-1 top-4 ${pos}`} >
                {Array.from({length: handleCount}).map((_, index) => (
                    <Handle
                        key={index}
                        type={handleType}
                        position={handlePosition}
                        id={`handle-${index}`}
                        style={{top: index * 20}}
                        isConnectable={true}
                    />
                ))}
            </div>
            <div className={""}>
                <Button.Group>
                    <Button size={"xs"} outline gradientDuoTone="cyanToBlue" onClick={setHandleCount}>+</Button>
                    <Button size={"xs"} outline gradientDuoTone="cyanToBlue" onClick={RemoveHandle}>-</Button>
                </Button.Group>
            </div>
        </div>
    );
};

export default HandleHolder;