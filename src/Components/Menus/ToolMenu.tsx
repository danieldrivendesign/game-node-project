import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {AiFillGithub} from 'react-icons/ai';
import {HelpModal} from '../GUI/HelpModal';
import {useGlobalStore} from '../Helpers/Database/Exporter';

export type DropDownItem = {
    name: string;
    onClick: () => void;
}

export interface DropDownItemProps {
    onSave: () => void;
    onLoad: () => Promise<void>;
    isToolMenuOpen: boolean,
    setToolMenuOpen: Dispatch<SetStateAction<boolean>>,
}


export default function ToolMenu({onSave, onLoad, isToolMenuOpen, setToolMenuOpen}: DropDownItemProps) {
    const [fileMenuOpen, setFileMenuOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const {state} = useGlobalStore();

    useEffect(() => {
        if (!isToolMenuOpen) {
            setFileMenuOpen(isToolMenuOpen);
        }
    }, [isToolMenuOpen]);

    function OnDropDownClick() {
        const newMenuState = !fileMenuOpen;
        setFileMenuOpen(newMenuState);
        if (setToolMenuOpen) {
            setToolMenuOpen(newMenuState);
        }
    }

    function OnClickWindow(event: React.MouseEvent<HTMLDivElement>) {
        const element = event.target as HTMLElement;
        if (element.tagName === 'BUTTON' || element.tagName === 'a' || element.tagName === 'svg') {
            return;
        }
        event.preventDefault();
        setFileMenuOpen(false);
    }

    const exportToJson = () => {
        onSave();
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(state, null, 2)
        )}`;
        const link = document.createElement('a');
        link.href = jsonString;
        link.download = 'gameData.json';
        link.click();
    };
    const importFromJson = () => {

    }

    return (
        <div className={'w-full bg-gradient-to-r to-red-700 from-purple-600 via-teal-500 pb-0.5 rounded-l-xl z-40'}
             onClick={OnClickWindow}>
            <div
                className={'flex pl-52 p-2 text-center bg-primary-light dark:bg-primary rounded-l-xl items-center justify-items-center gap-4'}>
                <AiFillGithub size={'35'}/>
                <div className={'flex'}>
                    <div>
                        <button id="dropdownDefaultButton" onClick={OnDropDownClick}
                                className="text-white hover:opacity-60 font-medium rounded-lg text-sm pr-5 py-2.5 text-center inline-flex items-center pointer-events-auto"
                                type="button">File <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 4 4 4-4"/>
                        </svg>
                        </button>
                        <div
                            className={(fileMenuOpen ? '' : 'h-0 ') + 'fixed mt-2 z-50 rounded-lg pointer-events-none'}>
                            <div
                                className={(fileMenuOpen ? 'bg-gradient-to-r to-red-700 from-purple-600 via-teal-500 p-[0.05rem] rounded-lg ' : '')}>
                                <div id="dropdown"
                                     className={(fileMenuOpen ? '' : 'h-0 ') + 'bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-secondary transition-all duration-150 ease-in-out'}>
                                    <ul className={(fileMenuOpen ? '' : 'h-0 ') + 'py-2 text-sm text-gray-700 dark:text-gray-200 transition-all duration-150 ease-in-out'}
                                        aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <button
                                                className={(fileMenuOpen ? '' : 'hidden ') + ' w-full block px-4 py-2 hover:opacity-60 pointer-events-auto'}
                                                onClick={(e) => {
                                                    onSave();
                                                    setFileMenuOpen(false);
                                                }}>
                                                Save
                                            </button>
                                            <hr className={(fileMenuOpen ? '' : 'hidden ') + 'h-px bg-gray-200 border-0 dark:bg-gray-700 pointer-events-auto'}/>
                                        </li>
                                        <li>
                                            <button
                                                className={(fileMenuOpen ? '' : 'hidden ') + ' w-full block px-4 py-2 hover:opacity-60 pointer-events-auto'}
                                                onClick={async (e) => {
                                                    await onLoad();
                                                    setFileMenuOpen(false);
                                                }}>
                                                Load
                                            </button>
                                            <hr className={(fileMenuOpen ? '' : 'hidden ') + 'h-px bg-gray-200 border-0 dark:bg-gray-700 pointer-events-auto'}/>
                                        </li>
                                        <li>
                                            <button
                                                className={(fileMenuOpen ? '' : 'hidden ') + ' w-full block px-4 py-2 hover:opacity-60 pointer-events-auto'}
                                                onClick={() => {
                                                    setIsHelpOpen(!isHelpOpen);
                                                    setFileMenuOpen(false);
                                                }}>
                                                Help
                                            </button>
                                            <hr className={(fileMenuOpen ? '' : 'hidden ') + 'h-px bg-gray-200 border-0 dark:bg-gray-700 pointer-events-auto'}/>
                                        </li>
                                        <li>
                                            <button
                                                className={(fileMenuOpen ? '' : 'hidden ') + ' w-full block px-4 py-2 hover:opacity-60 pointer-events-auto'}
                                                onClick={(e) => {
                                                    exportToJson();
                                                    setFileMenuOpen(false);
                                                }}>
                                                Export
                                            </button>
                                            <hr className={(fileMenuOpen ? '' : 'hidden ') + 'h-px bg-gray-200 border-0 dark:bg-gray-700 pointer-events-auto'}/>
                                        </li>
                                        <li>
                                            <button
                                                className={(fileMenuOpen ? '' : 'hidden ') + ' w-full block px-4 py-2 hover:opacity-60 pointer-events-auto'}
                                                onClick={(e) => {
                                                    importFromJson();
                                                    setFileMenuOpen(false);
                                                }}>
                                                Import
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <HelpModal isOpen={isHelpOpen} setIsOpen={setIsHelpOpen}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
