import React from 'react';
import {PropertyMetadata} from '../Types/NodeMetadata';

import {
    CheckboxInput,
    CustomFormInput,
    DropDownInput,
    ImageFileUpload,
    NumberInput,
    TextareaInput,
    TextInput
} from './InputComponents';

const componentRegistry = {
    string: TextInput,
    boolean: CheckboxInput,
    number: NumberInput,
    image: ImageFileUpload,
    enum: DropDownInput,
    textarea: TextareaInput
};

export type FormFactoryProps = {
    propName: string,
    data: any,
    id: string,
    handleInputChange: (propName: string, value: any) => void,
    isEditable?: boolean,
    metaData?: PropertyMetadata
}

export function FormFactory({
                                propName,
                                data,
                                id,
                                handleInputChange,
                                isEditable = true,
                                metaData
                            }: FormFactoryProps) {
    if (propName === 'isSelected') {
        return null;
    }
    let props: CustomFormInput = {
        id: id,
        name: propName,
        data: data[propName],
        isEditable: false,
        onInputChange: (e) => handleInputChange(propName, e),
        options: []
    };

    let typeName: string;
    if (metaData != undefined) {
        let options: string[] = [];

        if (typeof metaData.type === 'object' && 'enum' in metaData.type) {
            typeName = 'enum';
            options = metaData.type.enum;
        } else {
            typeName = metaData.type as string;
        }
        props.isEditable = metaData.isEditable;
        props.options = options;
    } else {
        typeName = typeof data[propName];
        //console.log('test', data[propName]);
        props.isEditable = isEditable;
        props.options = [];

    }
    // @ts-ignore
    const Comp = componentRegistry[typeName];
    if (!Comp) return null;

    return (
        <>
            <Comp {...props}/>
        </>
    );
}