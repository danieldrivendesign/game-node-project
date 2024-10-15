import {Flowbite} from 'flowbite-react';
import React, {Suspense, useState} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {DebugProvider} from './Components/Contexts/DebugProvider';
import SidebarRetract from './Components/GUI/SidebarRetract';
import LevelNodeEditor from './Components/Pages/LevelNodeEditor/LevelNodeEditor';
import Toaster from './Components/Utils/Toaster';
import {LoadingSpinner} from './LoadingSpinner';

const router = createBrowserRouter(
    [
        {path: '*', element: <LevelNodeEditor/>},
        {path: '/home', element: <></>}
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
                        <Toaster/>
                        <SidebarRetract/>
                        <RouterProvider router={router}></RouterProvider>
                    </Suspense>
                </Flowbite>
            </DebugProvider.Provider>
        </div>
    );
}

export default App;
