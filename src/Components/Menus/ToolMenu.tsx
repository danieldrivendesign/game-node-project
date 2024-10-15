import {useState} from 'react';

type DropDownItem = {
    name: string;
    onClick: () => void;
}

interface DropDownItemProps {
    dropDownItems: DropDownItem[];
}

const dropItems: DropDownItem[] = [
    {
        name: 'Save',
        onClick: () => {
        }
    },
    {
        name: 'Load',
        onClick: () => {
        }
    }
];

function ToolbarDropDown({dropDownItems}: DropDownItemProps) {
    const [fileMenuOpen, setFileMenuOpen] = useState(false);

    function OnDropDownClick() {
        setFileMenuOpen(!fileMenuOpen);
    }

    return (
        <div>
            <button id="dropdownDefaultButton" onClick={OnDropDownClick}
                    className="text-white hover:opacity-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button">File <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="m1 1 4 4 4-4"/>
            </svg>
            </button>
            <div
                className={(fileMenuOpen ? '' : 'h-0 ') + 'absolute mt-2 z-50 rounded-lg'}>
                <div className={(fileMenuOpen ? 'bg-gradient-to-r to-red-700 from-purple-600 via-teal-500 p-[0.05rem] rounded-lg ' : '')}>
                    <div id="dropdown"
                         className={(fileMenuOpen ? '' : 'h-0 ') + 'bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-secondary transition-all duration-150 ease-in-out'}>
                        <ul className={(fileMenuOpen ? '' : 'h-0 ') + 'py-2 text-sm text-gray-700 dark:text-gray-200 transition-all duration-150 ease-in-out'}
                            aria-labelledby="dropdownDefaultButton">
                            {dropDownItems.map((item: DropDownItem, i: number) => (
                                <li key={crypto.randomUUID()}>
                                    <button onClick={item.onClick}
                                            className={(fileMenuOpen ? '' : 'hidden ') + ' w-full block px-4 py-2 hover:opacity-60'}>
                                        {item.name}
                                    </button>
                                    {i < dropDownItems.length - 1 && <hr key={crypto.randomUUID()}
                                                                         className={(fileMenuOpen ? '' : 'hidden ') + 'h-px bg-gray-200 border-0 dark:bg-gray-700'}/>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ToolMenu() {

    return (
        <>
            <div className={'w-full bg-gradient-to-r to-red-700 from-purple-600 via-teal-500 pb-0.5'}>
                <div className={'flex pl-16 p-2 text-center bg-primary-light dark:bg-primary'}>
                    <ToolbarDropDown dropDownItems={dropItems}/>
                </div>
            </div>

        </>
    );
}
