import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {GetMetadataFromType} from '../../Helpers/Helpers';
import {AppNode} from '../../NodeEditors/LevelNodeEditor/Nodes/LevelEditorNodeTypes';
import {PropertyMetadata} from '../../Types/NodeMetadata';
import {FormFactory, FormFactoryProps} from '../../Helpers/FormFactory';

type DataEditSidebarData = {
    nodeData: AppNode | null,
    onNodeDataChange: (updatedData?: AppNode) => void
}

export function InspectorSidebar({nodeData, onNodeDataChange}: DataEditSidebarData) {
    const [children, setChildren] = useState<ReactElement[]>([]);

    const handleInputChange: (propName: string, value: any) => void = useCallback(
        (propName: string, value: any) => {
            if (nodeData == null) return;
            nodeData.data = {...nodeData.data, [propName]: value};
            onNodeDataChange(nodeData);
        },
        [nodeData, onNodeDataChange]
    );

    function SetMetaData(nodeMetadata: Record<string, PropertyMetadata>, newChildren: ReactElement[]) {
        if (nodeData?.data == null) return;

        for (const propName in nodeData.data) {
            if (!nodeMetadata[propName]) continue;

            const props: FormFactoryProps = {
                propName: propName,
                data: nodeData.data,
                id: `${nodeData.id}-${propName}`,
                handleInputChange: handleInputChange,
                metaData: nodeMetadata[propName]
            };

            const item = FormFactory(props);
            if (item != null) {
                newChildren.push(item);
            }
        }
    }

    useEffect(() => {
        if (!nodeData) {
            setChildren([]);
            return;
        }
        if (nodeData.type === null || nodeData.type === undefined) return;

        const nodeMetadata: Record<string, PropertyMetadata> | null = GetMetadataFromType(nodeData.type);

        const newChildren: ReactElement[] = [];
        const props = {
            propName: 'type',
            data: nodeData,
            id: `${nodeData.id}-type`,
            handleInputChange: handleInputChange,
            isEditable: false
        };
        const item: ReactElement | null = FormFactory(props);
        if (item != null) {
            newChildren.push(item);
        }
        if (nodeMetadata != null) {
            SetMetaData(nodeMetadata, newChildren);
        }
        setChildren(newChildren);
    }, [nodeData]);

    return (
        <div className={'bg-gradient-to-t to-red-700 from-purple-600 via-teal-500 p-[0.05rem] rounded-lg'}>
            <div
                className="border-r min-w-80 p-6 bg-primary-light border border-gray-200 rounded-lg shadow dark:bg-primary dark:border-gray-700 flex flex-col gap-2 overflow-y-auto max-h-[40rem]"
                data-testid="data-edit-sidebar">
                {children.length > 0 ? (
                    children.map((child: ReactElement, i: number) => (
                        <div key={i}>
                            {child}
                        </div>
                    ))) : (
                    <p>Click a Node to edit.</p>
                )}
            </div>
        </div>
    );
}