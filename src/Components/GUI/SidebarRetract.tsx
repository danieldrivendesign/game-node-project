import React, {useState} from 'react';
import {HiChevronDoubleLeft, HiChevronDoubleRight, HiAcademicCap} from 'react-icons/hi';
import {Page, pages} from '../Menus/SidebarPages';

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
                   className={(isExpanded ? 'w-64' : 'w-16') + ' fixed top-0 z-10 h-screen pt-20 transition-all duration-150 ease-in-out -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'}
                   aria-label="Sidebar">
                <div className={'w-full flex justify-end p-2'}>
                    {isExpanded ?
                        <button onClick={() => setIsExpanded(false)}>
                            <HiChevronDoubleLeft/>
                        </button> :
                        <button onClick={() => setIsExpanded(true)}>
                            <HiChevronDoubleRight/>
                        </button>}
                </div>
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
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
                        <li key={crypto.randomUUID()}>
                            <AccordionItem icon={<HiAcademicCap />} isExpanded={isExpanded} link={""} title={"Test"}/>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}

