import {Navbar} from 'flowbite-react';
import reactSvg from '../../assets/react.svg';

export function HeaderMenu() {
    return (
        <div className={'z-50 sticky w-full'}>
            <Navbar fluid rounded>
                <Navbar.Brand href="">
                    <img src={reactSvg} className="mr-3 h-6 sm:h-9" alt=""/>
                    <span
                        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Game Nodes</span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <img src={reactSvg} className="mr-3 h-6 sm:h-9" alt=""/>
                    <Navbar.Toggle/>
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}