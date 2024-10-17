import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {encodeImageToBase64, resizeAndEncodeImage} from '../Helpers';

export type CustomFormInput = {
    id: string,
    name: string,
    data: any,
    onInputChange: (e: any) => void,
    isEditable?: boolean,
    options?: string[]
}

function CreateLabel(name?: string, id?: string) {
    if (!name || !id) {
        return (<></>);
    }
    return (
        <div className="inline-flex items-center justify-center w-full">
            <hr className="w-4 h-[.2rem] bg-teal-600 border-0 dark:bg-blue-800 opacity-50 shadow shadow-teal-800 rounded-lg"/>
            <span
                className="px-3 text-pink-800/75 font-mono font-semibold align-center italic tracking-tight"><label
                htmlFor={id}>{name.toReadableString()}</label></span>
            <hr className="flex-grow h-[.2rem] bg-teal-600 border-0 dark:bg-blue-800 opacity-50 shadow shadow-teal-800 rounded-lg"/>
        </div>
    );
}

export function DropDownInput(props: CustomFormInput): ReactElement {
    const [input, setInput] = useState(props.data || '');

    useEffect(() => {
        setInput(props.data || '');
    }, [props.data]);

    function handleInputChange(event: ChangeEvent<HTMLSelectElement>) {
        setInput(event.target.value);
        props.onInputChange(event.target.value);
    }

    return (
        <div>
            {CreateLabel(props.name, (props.id + 'text'))}
            <select id={props.id + 'text'} onChange={handleInputChange} value={input}
                    disabled={!props.isEditable}
                    className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}>
                <option>Select an option...</option>
                {props.options?.map((item: string) => (
                    <option key={crypto.randomUUID()} value={item}>{item.toReadableString()}</option>
                ))}
            </select>
        </div>
    );
}

export function TextInput(props: CustomFormInput): ReactElement {
    const [input, setInput] = useState(props.data || '');

    useEffect(() => {
        setInput(props.data || '');
    }, [props.data]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value);
        props.onInputChange(event.target.value);
    }

    return (
        <div>
            {CreateLabel(props.name, (props.id + 'text'))}
            <input type="text" id={props.id + 'text'} value={input.toReadableString()}
                   onFocus={(e) => e.target.select()}
                   className="accent-pink-500 disabled:opacity-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder={`Enter ${props.name}`} onChange={handleInputChange}
                   disabled={!props.isEditable}/>
        </div>
    );
}

export function TextareaInput(props: CustomFormInput): ReactElement {
    const [input, setInput] = useState(props.data || '');

    useEffect(() => {
        setInput(props.data || '');
    }, [props.data]);

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setInput(event.target.value);
        props.onInputChange(event.target.value);
    }

    return (
        <div>
            {CreateLabel(props.name, (props.id + 'textarea'))}
            <textarea id={props.id + 'textarea'} value={input}
                      className="accent-pink-500 disabled:opacity-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Enter ${props.name}`} onChange={handleInputChange}
                      onFocus={(e) => e.target.select()}
                      disabled={!props.isEditable}/>
        </div>
    );
}

export function CheckboxInput(props: CustomFormInput): ReactElement {
    const [input, setInput] = useState(props.data);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInput(event.target.checked);
        props.onInputChange(event.target.checked);
    }

    return (
        <div>
            {CreateLabel(props.name, (props.id + 'checkbox'))}
            <input type="checkbox" id={props.id + 'checkbox'} checked={input} onChange={handleInputChange}
                   disabled={!props.isEditable}
                   className="accent-pink-500 disabled:opacity-50 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>

        </div>
    );
}

export function NumberInput(props: CustomFormInput): ReactElement {
    const [input, setInput] = useState(props.data || '');

    useEffect(() => {
        setInput(props.data || '');
    }, [props.data]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value);
        props.onInputChange(event.target.value);
    }

    return (
        <div>
            {CreateLabel(props.name, (props.id + 'number'))}
            <input type="number" id={props.id + 'number'} value={input} onFocus={(e) => e.target.select()}
                   className="accent-pink-500 disabled:opacity-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder={`Enter ${props.name.toTitleCase()}`} onChange={handleInputChange}
                   disabled={!props.isEditable}/>
        </div>
    );
}

export function ImageFileUpload(props: CustomFormInput): ReactElement {
    const [previewUrl, setPreviewUrl] = useState<string | null>(props.data ?? null);
    const [currentNodeId, setCurrentNodeId] = useState<string | null>(props.id);

    useEffect(() => {
        if (props.id !== null && props.id !== currentNodeId) {
            setCurrentNodeId(props.id);
            setPreviewUrl(props.data ?? null);
        }
    }, [props.id, props.data, currentNodeId]);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file: File | null = event.target.files?.[0] ?? null;

        if (file && file.type.startsWith('image/')) {
            try {
                const res = await resizeAndEncodeImage(file, 500, 500);
                setPreviewUrl(res);
                props.onInputChange(res);
            } catch (error) {
                setPreviewUrl(null);
                props.onInputChange(null);
            }
        } else {
            setPreviewUrl(null);
            props.onInputChange(null);
        }
    };

    return (
        <div>
            {CreateLabel(props.name, ('file-upload-' + props.id))}
            <input
                className="accent-pink-500 disabled:opacity-50 block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id={`file-upload-${props.id}`}
                type="file" accept="image/*"
                onChange={handleFileChange}
                onClick={(e) => (e.target as HTMLInputElement).value = ''}
                disabled={!props.isEditable}/>

            {previewUrl && (
                <div className={'mt-5 flex items-center justify-center border-cyan-700 border-2'}>
                    <img src={previewUrl} alt="Preview" style={{maxWidth: '100px', maxHeight: '100px'}}
                         className={'object-contain object-center w-full'}/>
                </div>
            )}
        </div>
    );
}
