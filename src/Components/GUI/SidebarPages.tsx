import React, {ReactElement} from 'react';
import {HiHome} from 'react-icons/hi';

export type Page = {
    title: string,
    icon: ReactElement | null,
    link: string,
    children?: Page[] | null
}

export const pages: Page[] = [{
    title: 'Home',
    icon: <HiHome size={'1em'}/>,
    link: '/home',
    children: null
}];

