import {Card, Kbd, Table} from "flowbite-react";
//import {MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowUp} from "react-icons/md";
import React from "react";

function InputGridItem({keyCodes, desc}: { keyCodes: string[]; desc: string }) {
    function toTitleCase(str: string): string {
        return str.replace(
            /\w\S*/g,
            text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {keyCodes.map((item, index) => (
                    <>
                        <Kbd>{toTitleCase(item)}</Kbd>{
                        index < keyCodes.length - 1 ? <span> or </span> : <></>
                    }
                    </>
                ))}
            </Table.Cell>
            <Table.Cell>{desc}</Table.Cell>
        </Table.Row>
    )
}

function InputGridItemWithIcon({icons, desc}: { icons: React.FC<React.SVGProps<SVGSVGElement>>[]; desc: string }) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {icons.map((item) => (
                    <Kbd icon={item}/>
                ))}
            </Table.Cell>
            <Table.Cell>{desc}</Table.Cell>
        </Table.Row>
    )
}


// todo: add Inputs
const inputSettings = {
    deleteKeyCode: ['Backspace', 'Delete'],

}
const keys = [
    {
        type: "keyCode",
        keys: ['Left Mouse','Middle Mouse'],
        description: "Pan Camera",
        icons: []
    },
    {
        type: "keyCode",
        keys: ['Scroll'],
        description: "Zoom",
        icons: []
    },
    {
        type: "keyCode",
        keys: ['delete', 'backspace'],
        description: "Delete Node / Edge",
        icons: []
    },
    {
        type: "keyCode",
        keys: ['shift'],
        description: "Selection Box",
        icons: []
    },
]

export function Inputs() {
    return (
        <Card>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Key</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {keys.map((item) => (
                        item.type === "keyCode" ? (<InputGridItem keyCodes={item.keys} desc={item.description}/>) :
                            (<InputGridItemWithIcon icons={item.icons} desc={item.description}/>)
                    ))}
                </Table.Body>
            </Table>
        </Card>
    );
}