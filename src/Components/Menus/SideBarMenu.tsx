import {Button, Drawer, Sidebar, TextInput} from 'flowbite-react';
import React, {useState} from 'react';
import {IconType} from 'react-icons';
import {HiChevronDoubleRight, HiHome, HiInformationCircle, HiSearch} from 'react-icons/hi';
import {HelpModal} from '../GUI/HelpModal';

type Page = {
    title: string,
    icon: IconType,
    link: string
}
const pages: Page[] = [
    {
        title: 'Home',
        icon: HiHome,
        link: ''
    }
];

export function SideBarMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

    function CloseMenu() {
        setIsOpen(false);
        setIsHelpOpen(false);
    }

    return (
        <>
            <div className={'absolute z-50'}>
                <div>
                    <Button outline gradientDuoTone="cyanToBlue" onClick={() => setIsOpen(true)}>
                        <HiChevronDoubleRight/>
                    </Button>
                </div>
                <Drawer open={isOpen} onClose={CloseMenu}>
                    <Drawer.Header title="MENU" titleIcon={() => <></>}/>
                    <Drawer.Items>
                        <Sidebar
                            aria-label="Sidebar with multi-level dropdown example"
                            className="[&>div]:bg-transparent [&>div]:p-0"
                        >
                            <div className="flex h-full flex-col justify-between py-2">
                                <div>
                                    <form className="pb-3 md:hidden">
                                        <TextInput icon={HiSearch} type="search" placeholder="Search" required
                                                   size={32}/>
                                    </form>
                                    <Sidebar.Items>
                                        <Sidebar.ItemGroup>
                                            {pages.map((p, i) => {
                                                return (
                                                    <Sidebar.Item key={i} icon={p.icon} href={p.link}>
                                                        {p.title}
                                                    </Sidebar.Item>
                                                );
                                            })}
                                        </Sidebar.ItemGroup>
                                        <Sidebar.ItemGroup>
                                            <Sidebar.Item icon={HiInformationCircle}>
                                                <button onClick={() => setIsHelpOpen(true)}>Help</button>
                                            </Sidebar.Item>
                                        </Sidebar.ItemGroup>
                                    </Sidebar.Items>
                                </div>
                            </div>
                        </Sidebar>
                    </Drawer.Items>
                </Drawer>
                <HelpModal isOpen={isHelpOpen} setIsOpen={setIsHelpOpen}/>
            </div>
        </>
    );
}
