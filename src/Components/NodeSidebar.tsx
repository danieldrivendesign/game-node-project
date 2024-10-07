import {DragEvent} from 'react';
import {Sidebar} from "flowbite-react";


const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
};

const nodeTypes = [
    'levelNode'
]

export default () => {
    return <Sidebar aria-label="Sidebar with logo branding example" className={"relative"}>
        {/*<Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">*/}
        {/*    Nodes*/}
        {/*</Sidebar.Logo>*/}
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                {nodeTypes.map((s, i) => (
                        <Sidebar.Item key={i}>
                            <div className="dndnode input" onDragStart={(event: DragEvent) => onDragStart(event, s)}
                                 draggable>
                                Level
                            </div>
                        </Sidebar.Item>
                    ))}
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>;
};
