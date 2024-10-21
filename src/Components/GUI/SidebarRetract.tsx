import {DarkThemeToggle} from 'flowbite-react';
import React, {useState} from 'react';
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi';
import {Page, pages} from './SidebarPages';

function CustomSidebarItem({title, icon, link, isExpanded}: Page & { isExpanded: boolean }) {
    return (
        <>
            {isExpanded ?
                <a href={link}
                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    {icon}
                    <span className="indent-5">{title.toTitleCase()}</span>
                </a>
                :
                <a href={link}
                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    {icon}
                </a>
            }
        </>
    );
}

function AccordionItem({title, icon, link, isExpanded}: Page & { isExpanded: boolean }) {
    return (
        <>
            {isExpanded ?
                <div data-accordion="collapse"
                     data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                     data-inactive-classes="text-gray-500 dark:text-gray-400">
                    <h2>
                        <button type="button"
                                className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                                data-accordion-target="#accordion-flush-body-1" aria-expanded="true"
                                aria-controls="accordion-flush-body-1">
                            <a href={link}
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {icon}
                                <span className="indent-5">{title.toTitleCase()}</span>
                            </a>
                            <svg data-accordion-icon="" className="w-3 h-3 rotate-180 shrink-0"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 5 5 1 1 5"/>
                            </svg>
                        </button>
                    </h2>
                    <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">Stuff</p>
                        </div>
                    </div>
                </div>
                :
                <a href={link}
                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    {icon}
                </a>
            }
        </>
    );
}

export default function SidebarRetract() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <aside id="logo-sidebar"
                   className={(isExpanded ? 'w-48 ' : 'w-16 ') + 'h-full absolute top-0 rounded-sm z-10 transition-all duration-150 ease-in-out -translate-x-full sm:translate-x-0 mb-32 overflow-x-hidden'}
                   aria-label="Sidebar">
                <div
                    className={'flex flex-col bg-gradient-to-bl to-red-700 from-purple-600 via-teal-500 pr-[0.1rem] h-full'}>
                    <div className={'dark:bg-primary bg-primary-light w-full flex-grow pt-[3.5rem] flex flex-col'}>
                        <div className={'w-full flex justify-end p-2'}>
                            {isExpanded ?
                                <button onClick={() => setIsExpanded(false)} className={'hover:opacity-70'}>
                                    <HiChevronDoubleLeft size={'20'}/>
                                </button> :
                                <button onClick={() => setIsExpanded(true)} className={'hover:opacity-70'}>
                                    <HiChevronDoubleRight size={'20'}/>
                                </button>}
                        </div>
                        <div
                            className="px-3 overflow-y-auto bg-primary-light dark:bg-primary flex flex-col flex-grow gap-4">
                            <div className={'flex-grow'}>
                                <ul className="space-y-2 font-medium">
                                    {pages.map((p: Page) => {
                                        return (
                                            <li key={crypto.randomUUID()}>
                                                <CustomSidebarItem title={p.title} icon={p.icon}
                                                                   link={p.link}
                                                                   isExpanded={isExpanded}/>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <hr key={crypto.randomUUID()}
                                className={(isExpanded ? '' : 'w-8 ') + 'h-px bg-gray-200 border-0 dark:bg-gray-700'}/>
                            <div className={'mb-10'}>
                                <DarkThemeToggle defaultValue={'dark'} className={'p-0 m-0 '}/>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

