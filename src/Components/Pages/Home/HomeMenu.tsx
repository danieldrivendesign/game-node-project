import {Button} from 'flowbite-react';
import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function HomeMenu() {
    const navigate = useNavigate();

    function onNavClicked(target: string) {
        navigate(`/${target}`)
    }

    useEffect(() => {
        document.title = 'Home';
    }, []);

    return (
        <div className={'h-screen w-screen ml-52'}>
            <Button onClick={(e: any) =>onNavClicked("levelEditor")}>Level Editor</Button>
            <Button onClick={(e: any) =>onNavClicked("gameStateEditor")}>Game State Editor</Button>
        </div>
    )
}
