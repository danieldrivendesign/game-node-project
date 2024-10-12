import React, {ReactElement, useEffect, useState} from 'react';
import {AppNode} from '../Nodes';
import {FormFactory} from './FormFactory.js';

type DataEditSidebarData = {
    nodeData: AppNode | null,
    onNodeDataChange: (updatedData?: AppNode) => void
}

export function InspectorSidebar({nodeData, onNodeDataChange}: DataEditSidebarData) {
    const [children, setChildren] = useState<ReactElement[]>([]);

    useEffect(() => {
        if (!nodeData) {
            setChildren([]);
            return;
        }

        const handleInputChange: (propName: string, value: any) => void = (propName: string, value: any) => {
            nodeData.data = {...nodeData.data, [propName]: value};
            onNodeDataChange(nodeData);
        };

        const newChildren: ReactElement[] = [];

        for (const propName in nodeData.data) {
            const props = {
                propName,
                data: nodeData.data,
                id: `${nodeData.id}-${propName}`,
                handleInputChange
            };
            const item = FormFactory(props);
            if (item != null) {
                newChildren.push(item);
            }
        }
        setChildren(newChildren);
    }, [nodeData]);

    return (
        <div
            className="border-r min-w-80 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2"
            data-testid="data-edit-sidebar">
            {children.length > 0 ? (
                children.map((child, i) => (
                    <div key={i}>
                        {child}
                    </div>
                ))) : (
                <p>Click a Node to edit.</p>
            )}
        </div>
    );
}

