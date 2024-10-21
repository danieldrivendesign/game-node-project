import {Flowbite} from 'flowbite-react';
import React, {Suspense, useState} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {DebugProvider} from './Components/Debug/DebugProvider';
import SidebarRetract from './Components/GUI/SidebarRetract';
import {GlobalProvider} from './Components/Helpers/Database/Exporter';
import GameStateNodeEditor from './Components/Pages/GameStateNodeEditor/GameStateNodeEditor';
import HomeMenu from './Components/Pages/Home/HomeMenu';
import LevelNodeEditor from './Components/Pages/LevelNodeEditor/LevelNodeEditor';
import {ToastProvider} from './Components/Utils/ToastContext';
import Toaster from './Components/Utils/Toaster';
import {LoadingSpinner} from './LoadingSpinner';

const router = createBrowserRouter(
    [
        {path: '*', element: <LevelNodeEditor/>},
        {path: '/home', element: <HomeMenu/>},
        {path: '/levelEditor', element: <LevelNodeEditor/>},
        {path: '/gameStateEditor', element: <GameStateNodeEditor/>},
    ]
);

function App() {
    const [canDebug, setCanDebug] = useState(false);
    return (
        <div>
            <button
                className={'absolute bottom-1 right-56 text-white z-50 border-2 border-teal-400 hover:bg-primary rounded-lg p-1 opacity-20 text-xs'}
                onClick={() => {
                    setCanDebug(!canDebug);
                }}>Show Debug
            </button>
            <DebugProvider.Provider value={canDebug}>
                <Flowbite>
                    <Suspense fallback={<LoadingSpinner/>}>
                        <GlobalProvider>
                            <ToastProvider>
                                <Toaster/>
                                <SidebarRetract/>
                                <RouterProvider router={router}></RouterProvider>
                            </ToastProvider>
                        </GlobalProvider>
                    </Suspense>
                </Flowbite>
            </DebugProvider.Provider>
        </div>
    );
}

export default App;
