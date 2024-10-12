import React, {ChangeEvent, useEffect, useState} from 'react';
import {LevelType} from '../Nodes';

type CustomFormInput = {
    id: string;
    name: string;
    data: any,
    onInputChange: (e: any) => void;
}

function TextInput({id, name, data, onInputChange}: CustomFormInput) {
    const [input, setInput] = useState(data || '');

    useEffect(() => {
        setInput(data || '');
    }, [data]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value);
        onInputChange(event.target.value);
    }

    return (
        <div>
            <label htmlFor={id + 'text'}
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{name.toTitleCase()}</label>
            <input type="text" id={id + 'text'} value={input} onFocus={(e) => e.target.select()}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder={`Enter ${name.toTitleCase()}`} onChange={handleInputChange}/>
        </div>
    );
}

function CheckboxInput({id, name, data, onInputChange}: CustomFormInput) {
    const [input, setInput] = useState(data);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInput(event.target.checked);
        onInputChange(event.target.checked);
    }

    return (
        <div>
            <input type="checkbox" id={id + 'checkbox'} checked={input} onChange={handleInputChange}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor={id + 'checkbox'}
                   className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{name.toTitleCase()}</label>
        </div>
    );
}

function TextareaInput({id, name, data, onInputChange}: CustomFormInput) {
    const [input, setInput] = useState(data || '');

    useEffect(() => {
        setInput(data || '');
    }, [data]);

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setInput(event.target.value);
        onInputChange(event.target.value);
    }

    return (
        <div>

            <label htmlFor={id + 'textarea'}
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{name.toTitleCase()}</label>
            <textarea id={id + 'textarea'} value={input}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Enter ${name}`} onChange={handleInputChange} onFocus={(e) => e.target.select()}/>

        </div>
    );
}

function NumberInput({id, name, data, onInputChange}: CustomFormInput) {
    const [input, setInput] = useState(data || '');

    useEffect(() => {
        setInput(data || '');
    }, [data]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value);
        onInputChange(event.target.value);
    }
    return (
        <div>
            <label htmlFor={id + 'textarea'}
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{name.toTitleCase()}</label>
            <input type="number" id={id + 'text'} value={input} onFocus={(e) => e.target.select()}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder={`Enter ${name.toTitleCase()}`} onChange={handleInputChange}/>
        </div>
    );
}

function ImageFileUpload({id, name, data, onInputChange}: CustomFormInput) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(data ? URL.createObjectURL(data) : null);

    useEffect(() => {
        setPreviewUrl(data ? URL.createObjectURL(data) : null);
    }, [data]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        if (file && file.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(file));
            onInputChange(file);
        } else {
            setPreviewUrl(null);
            onInputChange(null);
        }
    };
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                   htmlFor={`file-upload-${id}`}>{name.toTitleCase()}</label>
            <input
                className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id={`file-upload-${id}`}
                type="file" accept="image/*"
                onChange={handleFileChange}
                onClick={(e) => (e.target as HTMLInputElement).value = ''}/>

            {previewUrl && (
                <div className={'mt-5 flex items-center justify-center border-cyan-700 border-2'}>
                    <img src={previewUrl} alt="Preview" style={{maxWidth: '200px', maxHeight: '200px'}}
                         className={'object-contain object-center w-full'}/>
                </div>
            )}
        </div>
    );
}

type FormFactoryProps = {
    propName: string,
    data: any,
    id: string,
    handleInputChange: (propName: string, value: any) => void,
}

export function FormFactory({propName, data, id, handleInputChange}: FormFactoryProps) {
    if (propName === 'isSelected') {
        return null;
    }
    let typeName = typeof data[propName];
    // if (data[propName] is LevelType){
    //
    // }
    console.log(`${propName}: ${data[propName]} - ${typeName}`)
    switch (typeName) {
        case 'boolean':
            return (
                <CheckboxInput
                    id={id}
                    name={propName}
                    data={data[propName]}
                    onInputChange={(e) => handleInputChange(propName, e)}
                />
            );
        case 'string':
            if (propName === 'description') {
                return (
                    <TextareaInput
                        id={id}
                        name={propName}
                        data={data[propName]}
                        onInputChange={(e) => handleInputChange(propName, e)}
                    />
                );
            } else {
                return (
                    <TextInput
                        id={id}
                        name={propName}
                        data={data[propName]}
                        onInputChange={(e) => handleInputChange(propName, e)}
                    />
                );
            }
        case 'object':
            if (propName === 'image') {
                return (
                    <ImageFileUpload
                        id={id}
                        name={propName}
                        data={data[propName]}
                        onInputChange={(file) => handleInputChange(propName, file)}
                    />
                );
            }
            break;
        case 'number':
            return (
                <NumberInput
                    id={id}
                    name={propName}
                    data={data[propName]}
                    onInputChange={(file) => handleInputChange(propName, file)}
                />
            );
    }
    return null;
}